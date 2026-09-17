import { AlertTriangle, CheckCircle2, RefreshCw, ShieldCheck } from 'lucide-react';
import { ConnectWhatsAppButton } from './ConnectWhatsAppButton';
import type { WhatsAppConnectionStatus } from './whatsapp.types';

type Props = {
  status: WhatsAppConnectionStatus | null;
  isLoading: boolean;
  isConnecting: boolean;
  canConnect: boolean;
  error: string | null;
  onConnect: () => void;
};

export const WhatsAppConnectionCard = ({
  status,
  isLoading,
  isConnecting,
  canConnect,
  error,
  onConnect,
}: Props) => {
  const connected = status?.connected === true;

  return (
    <section className="w-full max-w-2xl rounded-3xl border border-[#F3DEC8] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <img src="/brand-icons/whatsapp.png" alt="WhatsApp" className="h-12 w-12 rounded-2xl object-contain" />
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-black text-[#1E122C]">WhatsApp Business</h1>
          <p className="mt-1 text-sm text-[#6B5E77]">
            Securely connect your WhatsApp Business account to GrowWise.
          </p>
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-[#F3DEC8] bg-[#FAF5F0] p-4">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-[#6B5E77]">
            <RefreshCw className="h-4 w-4 animate-spin" /> Checking connection status…
          </div>
        ) : connected ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#15803D]">
              <CheckCircle2 className="h-5 w-5" /> Connected
            </div>
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              <div><dt className="text-[#6B5E77]">Phone</dt><dd className="font-bold text-[#1E122C]">{status.display_phone_number}</dd></div>
              <div><dt className="text-[#6B5E77]">Status</dt><dd className="font-bold text-[#15803D]">Connected</dd></div>
            </dl>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-bold text-[#1E122C]">Status: Not Connected</p>
            <p className="text-xs leading-5 text-[#6B5E77]">
              Meta will let you select or create your business, WhatsApp Business Account, and phone number. No token or phone ID is entered here manually.
            </p>
          </div>
        )}
      </div>

      {error && (
        <div role="alert" className="mt-4 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!connected && !isLoading && (
        <div className="mt-6 space-y-3">
          <ConnectWhatsAppButton onClick={onConnect} loading={isConnecting} disabled={!canConnect} />
          {!canConnect && (
            <p className="text-xs text-amber-700">
              Missing public setup: add VITE_WHATSAPP_META_APP_ID and VITE_WHATSAPP_EMBEDDED_SIGNUP_CONFIG_ID, then restart the frontend.
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex gap-2 border-t border-[#F3DEC8] pt-4 text-xs leading-5 text-[#6B5E77]">
        <ShieldCheck className="h-4 w-4 shrink-0 text-[#16A34A]" />
        <span>Meta authentication takes place in Meta’s popup. Access tokens are sent only to the backend and stored encrypted.</span>
      </div>
    </section>
  );
};