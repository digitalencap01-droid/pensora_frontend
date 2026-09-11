import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { blogApi } from '../services/blogApi';
import { ContentGenerateRequest } from '../types/blogApi';

/**
 * Real Pensora backend project list (Post History / Library tab).
 */
export const useProjectsQuery = (limit = 50, offset = 0) => {
  return useQuery({
    queryKey: queryKeys.blog.projects(limit, offset),
    queryFn: () => blogApi.listProjects(limit, offset),
    // Pipeline runs can complete between polls — keep the library reasonably fresh.
    refetchInterval: 15000,
  });
};

/**
 * Full generated artifacts (article/seo/html/keywords) for one project,
 * fetched lazily when the user opens "Read Article" on a library card.
 */
export const useProjectArtifactsQuery = (projectId: string | null) => {
  return useQuery({
    queryKey: queryKeys.blog.artifacts(projectId),
    queryFn: () => blogApi.getProjectArtifacts(projectId as string),
    enabled: !!projectId,
  });
};

export const useUsageSummaryQuery = () => {
  return useQuery({
    queryKey: queryKeys.blog.usageSummary,
    queryFn: () => blogApi.getUsageSummary(),
    refetchInterval: 15000,
  });
};

/**
 * Runs the full research -> brief -> article -> SEO -> HTML pipeline.
 * Rate-limited server-side (default 5/hour) — errors surface via BlogApiError.
 */
export const useGenerateContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ContentGenerateRequest) => blogApi.generateContent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', 'projects'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.blog.usageSummary });
    },
  });
};
