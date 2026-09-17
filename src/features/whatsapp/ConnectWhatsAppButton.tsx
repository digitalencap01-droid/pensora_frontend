import { RefreshCw, MessageSquare } from 'lucide-react';

type Props = {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
};

export const ConnectWhatsAppButton = ({ onClick, loading, disabled = false }: Props) => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading || disabled}
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-60"
  >
    {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
    {loading ? 'Connecting with Meta…' : 'Connect WhatsApp Now'}
  </button>
);