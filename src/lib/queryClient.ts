import { QueryClient } from '@tanstack/react-query';

/**
 * Central TanStack Query Client configured for AI Digital Marketing workloads:
 * - 5 min default staleTime to prevent redundant/expensive AI API calls
 * - 30 min cache retention (gcTime)
 * - fail-fast retry strategy
 * - window focus refetch disabled to prevent unexpected re-renders during active user editing
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      gcTime: 1000 * 60 * 30,   // 30 minutes garbage collection
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
