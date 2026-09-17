import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMarketing } from '../../context/MarketingContext';
import { startMetaEmbeddedSignup, isEmbeddedSignupConfigured } from './metaEmbeddedSignup';
import { connectWhatsApp, getBackendWorkspaceId, getWhatsAppStatus } from './whatsapp.service';
import { WhatsAppConnectionCard } from './WhatsAppConnectionCard';
import type { WhatsAppConnectionStatus } from './whatsapp.types';

export const WhatsAppConnectionPage = () => {
  const { activeWorkspace, updateWorkspace } = useMarketing();
  const workspaceKey = activeWorkspace?.id || 'default';
  const backendWorkspaceId = useMemo(() => getBackendWorkspaceId(workspaceKey), [workspaceKey]);
  const [status, setStatus] = useState<WhatsAppConnectionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncWorkspace = useCallback((next: WhatsAppConnectionStatus) => {
    if (!activeWorkspace?.id) return;
    updateWorkspace(activeWorkspace.id, {
      whatsapp: {
        whatsappNumber: next.display_phone_number || '',
        businessType: activeWorkspace.whatsapp?.businessType || 'promotional_broadcasts',
        subscriberOptInCount: activeWorkspace.whatsapp?.subscriberOptInCount || '',
        preferredLanguage: activeWorkspace.whatsapp?.preferredLanguage || '',
        isConnected: next.connected,
        connectedAt: next.connected ? new Date().toISOString() : undefined,
        connectionMethod: 'cloud_api',
      },
    });
  }, [activeWorkspace, updateWorkspace]);

  const refreshStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const next = await getWhatsAppStatus(backendWorkspaceId);
      setStatus(next);
    } catch (err) {
      setStatus({ connected: false, status: 'NOT_CONNECTED', display_phone_number: null, waba_id: null, phone_number_id: null });
      setError(err instanceof Error ? err.message : 'Could not load WhatsApp connection status.');
    } finally {
      setIsLoading(false);
    }
  }, [backendWorkspaceId]);

  useEffect(() => { void refreshStatus(); }, [refreshStatus]);

  const handleConnect = async () => {
    setError(null);
    setIsConnecting(true);
    try {
      const metaResult = await startMetaEmbeddedSignup();
      const next = await connectWhatsApp(backendWorkspaceId, metaResult);
      setStatus(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'WhatsApp could not be connected.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <main className="min-h-full bg-[#FFFDFB] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <WhatsAppConnectionCard
          status={status}
          isLoading={isLoading}
          isConnecting={isConnecting}
          canConnect={isEmbeddedSignupConfigured}
          error={error}
          onConnect={() => void handleConnect()}
        />
      </div>
    </main>
  );
};

export default WhatsAppConnectionPage;