export type WhatsAppConnectionStatus = {
  connected: boolean;
  status: 'NOT_CONNECTED' | 'CONNECTED';
  display_phone_number: string | null;
  waba_id: string | null;
  phone_number_id: string | null;
};

export type MetaEmbeddedSignupResult = {
  code: string;
  wabaId: string;
  phoneNumberId: string;
};