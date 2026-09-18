/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_WHATSAPP_META_APP_ID?: string;
  readonly VITE_WHATSAPP_META_GRAPH_API_VERSION?: string;
  readonly VITE_WHATSAPP_EMBEDDED_SIGNUP_CONFIG_ID?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
