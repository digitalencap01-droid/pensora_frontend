import type { MetaEmbeddedSignupResult } from './whatsapp.types';

type FacebookLoginResponse = { authResponse?: { code?: string } };
type FacebookSdk = {
  init: (options: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
  login: (
    callback: (response: FacebookLoginResponse) => void,
    options: {
      config_id: string;
      response_type: 'code';
      override_default_response_type: true;
      extras: {
        setup: Record<string, never>;
        featureType: string;
        sessionInfoVersion: string;
      };
    },
  ) => void;
};

declare global {
  interface Window { FB?: FacebookSdk; }
}

const appId = import.meta.env.VITE_WHATSAPP_META_APP_ID;
const graphVersion = import.meta.env.VITE_WHATSAPP_META_GRAPH_API_VERSION || 'v23.0';
const configId = import.meta.env.VITE_WHATSAPP_EMBEDDED_SIGNUP_CONFIG_ID;

export const isEmbeddedSignupConfigured = Boolean(appId && configId);

const loadFacebookSdk = (): Promise<FacebookSdk> => new Promise((resolve, reject) => {
  if (window.FB) {
    resolve(window.FB);
    return;
  }
  const existing = document.getElementById('facebook-jssdk') as HTMLScriptElement | null;
  if (existing) {
    existing.addEventListener('load', () => window.FB ? resolve(window.FB) : reject(new Error('Meta SDK did not load.')), { once: true });
    existing.addEventListener('error', () => reject(new Error('Meta SDK could not load.')), { once: true });
    return;
  }
  const script = document.createElement('script');
  script.id = 'facebook-jssdk';
  script.async = true;
  script.defer = true;
  script.src = 'https://connect.facebook.net/en_US/sdk.js';
  script.onload = () => window.FB ? resolve(window.FB) : reject(new Error('Meta SDK did not load.'));
  script.onerror = () => reject(new Error('Meta SDK could not load.'));
  document.head.appendChild(script);
});

const parseMessage = (value: unknown): Record<string, unknown> | null => {
  if (typeof value === 'string') {
    try { return JSON.parse(value) as Record<string, unknown>; } catch { return null; }
  }
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : null;
};

/** Starts Meta's official popup; passwords and tokens never pass through this app. */
export const startMetaEmbeddedSignup = async (): Promise<MetaEmbeddedSignupResult> => {
  if (!appId || !configId) {
    throw new Error('WhatsApp Embedded Signup is not configured. Set VITE_WHATSAPP_META_APP_ID and VITE_WHATSAPP_EMBEDDED_SIGNUP_CONFIG_ID.');
  }
  const sdk = await loadFacebookSdk();
  sdk.init({ appId, cookie: true, xfbml: false, version: graphVersion });

  return new Promise((resolve, reject) => {
    let code: string | undefined;
    let signup: { wabaId: string; phoneNumberId: string } | undefined;
    let settled = false;
    const timeout = window.setTimeout(() => fail(new Error('Meta signup timed out. Please try again.')), 5 * 60 * 1000);

    const cleanUp = () => {
      window.clearTimeout(timeout);
      window.removeEventListener('message', onMessage);
    };
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanUp();
      reject(error);
    };
    const complete = () => {
      if (!code || !signup || settled) return;
      settled = true;
      cleanUp();
      resolve({ code, wabaId: signup.wabaId, phoneNumberId: signup.phoneNumberId });
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.facebook.com') return;
      const message = parseMessage(event.data);
      if (!message || message.type !== 'WA_EMBEDDED_SIGNUP') return;
      if (message.event === 'FINISH') {
        const data = message.data as Record<string, unknown> | undefined;
        const wabaId = data?.waba_id;
        const phoneNumberId = data?.phone_number_id;
        if (typeof wabaId !== 'string' || typeof phoneNumberId !== 'string') {
          fail(new Error('Meta did not return the selected WhatsApp account.'));
          return;
        }
        signup = { wabaId, phoneNumberId };
        complete();
      } else if (message.event === 'CANCEL' || message.event === 'ERROR') {
        fail(new Error('Meta Embedded Signup was not completed.'));
      }
    };

    window.addEventListener('message', onMessage);
    sdk.login((response) => {
      code = response.authResponse?.code;
      if (!code) {
        fail(new Error('Meta authorization was cancelled or no authorization code was returned.'));
        return;
      }
      complete();
    }, {
      config_id: configId,
      response_type: 'code',
      override_default_response_type: true,
      // Permissions come from the selected Meta Embedded Signup configuration.
      // Requesting unsupported scopes here makes Meta reject the login before
      // it can start WhatsApp onboarding.
      extras: {
        setup: {},
        featureType: '',
        sessionInfoVersion: '3',
      },
    });
  });
};