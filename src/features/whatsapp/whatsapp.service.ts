import type { WhatsAppConnectionStatus } from './whatsapp.types';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const createUuid = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    const value = Math.floor(Math.random() * 16);
    return (character === 'x' ? value : (value & 0x3) | 0x8).toString(16);
  });
};

/**
 * The current UI uses mock workspace ids such as `w_bloom`, while the backend
 * correctly requires UUID workspace ids. Keep a stable UUID per UI workspace
 * until real authenticated workspace ids are supplied by the app.
 */
export const getBackendWorkspaceId = (workspaceId: string): string => {
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(workspaceId)) {
    return workspaceId;
  }
  const key = `whatsapp_backend_workspace_id:${workspaceId}`;
  const saved = localStorage.getItem(key);
  if (saved) return saved;
  const generated = createUuid();
  localStorage.setItem(key, generated);
  return generated;
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, init);
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { detail?: string } | null;
    throw new Error(body?.detail || 'WhatsApp connection request failed.');
  }
  return response.json() as Promise<T>;
};

export const getWhatsAppStatus = (workspaceId: string): Promise<WhatsAppConnectionStatus> =>
  request<WhatsAppConnectionStatus>(`/api/v1/whatsapp/status?workspace_id=${encodeURIComponent(workspaceId)}`);

export const connectWhatsApp = (
  workspaceId: string,
  payload: { code: string; wabaId: string; phoneNumberId: string },
): Promise<WhatsAppConnectionStatus> =>
  request<WhatsAppConnectionStatus>(
    `/api/v1/whatsapp/connect?workspace_id=${encodeURIComponent(workspaceId)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: payload.code,
        waba_id: payload.wabaId,
        phone_number_id: payload.phoneNumberId,
      }),
    },
  );