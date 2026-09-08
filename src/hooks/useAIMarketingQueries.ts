import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { apiService } from '../services/api';
import { AIAction, Recommendation, ContentItem, WebsiteIssue, AdCampaign } from '../types';

/**
 * 1. Fetch AI Actions with TanStack Query
 */
export const useAIActionsQuery = (workspaceId?: string | null) => {
  return useQuery({
    queryKey: queryKeys.actions.all(workspaceId),
    queryFn: async () => {
      const res = await apiService.getActions();
      return res;
    },
  });
};

/**
 * 2. Mutation for 1-Click AI Action Approval with Instant Cache Invalidation
 */
export const useApproveActionMutation = (workspaceId?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (actionId: string) => {
      return await apiService.approveAction(actionId);
    },
    onSuccess: () => {
      // Invalidate both actions and active tasks cache
      queryClient.invalidateQueries({ queryKey: queryKeys.actions.all(workspaceId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics.performance(workspaceId) });
    },
  });
};

/**
 * 3. Fetch Strategic AI Recommendations
 */
export const useRecommendationsQuery = (workspaceId?: string | null) => {
  return useQuery({
    queryKey: queryKeys.recommendations.all(workspaceId),
    queryFn: async () => {
      return await apiService.getRecommendations();
    },
  });
};

/**
 * 4. Mutation for Applying AI Recommendation
 */
export const useApplyRecommendationMutation = (workspaceId?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recId: string) => {
      return await apiService.applyRecommendation(recId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recommendations.all(workspaceId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.actions.all(workspaceId) });
    },
  });
};

/**
 * 5. Fetch Website Health Issues
 */
export const useWebsiteIssuesQuery = (workspaceId?: string | null) => {
  return useQuery({
    queryKey: queryKeys.website.issues(workspaceId),
    queryFn: async () => {
      return await apiService.getWebsiteIssues();
    },
  });
};

/**
 * 6. Mutation for 1-Click Instant Technical SEO / Website AI Fix
 */
export const useFixWebsiteIssueMutation = (workspaceId?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (issueId: string) => {
      return await apiService.fixWebsiteIssue(issueId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.website.issues(workspaceId) });
    },
  });
};

/**
 * 7. Live Background Task Poller
 * Used for long-running AI operations (Automated Scraping, Bulk Content Generation, Ad Audits)
 * Automatically polls every 2 seconds while isRunning is true.
 */
export const useAITaskPoller = (taskId: string | null, isRunning: boolean) => {
  return useQuery({
    queryKey: queryKeys.aiTask.status(taskId),
    queryFn: async () => {
      if (!taskId) return null;
      // When connecting backend, call GET /api/ai/tasks/:taskId
      return { taskId, status: isRunning ? 'running' : 'completed', progress: 100 };
    },
    enabled: !!taskId && isRunning,
    refetchInterval: isRunning ? 2000 : false, // Poll every 2 seconds during active generation
  });
};
