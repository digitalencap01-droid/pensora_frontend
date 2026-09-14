import {
  ApiErrorPayload,
  ContentGenerateRequest,
  ContentGenerateResult,
  ProjectArtifactsResult,
  ProjectListResult,
  UsageSummary,
  WebflowPublishResponse,
  WebflowStatusResponse,
  LinkedInStatusResponse,
  LinkedInPublishResult,
} from '../types/blogApi';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export class BlogApiError extends Error {
  status: number;
  retryAfterSeconds?: number;
  stage?: string;

  constructor(message: string, status: number, retryAfterSeconds?: number, stage?: string) {
    super(message);
    this.name = 'BlogApiError';
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
    this.stage = stage;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
    });
  } catch {
    throw new BlogApiError(
      `Could not reach the Pensora backend at ${API_BASE_URL}. Is it running?`,
      0
    );
  }

  if (!response.ok) {
    let detail: string | ApiErrorPayload | undefined;
    try {
      const body = await response.json();
      detail = body?.detail;
    } catch {
      // Non-JSON error body — fall back to status text below.
    }

    const message =
      typeof detail === 'string'
        ? detail
        : detail?.message || response.statusText || 'Request failed';
    const stage = typeof detail === 'object' ? detail?.stage : undefined;

    const retryAfterHeader = response.headers.get('Retry-After');
    throw new BlogApiError(
      message,
      response.status,
      retryAfterHeader ? Number(retryAfterHeader) : undefined,
      stage
    );
  }

  return response.json() as Promise<T>;
}

export const blogApi = {
  generateContent(payload: ContentGenerateRequest): Promise<ContentGenerateResult> {
    return request<ContentGenerateResult>('/api/v1/content/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  listProjects(limit = 50, offset = 0): Promise<ProjectListResult> {
    return request<ProjectListResult>(
      `/api/v1/projects?limit=${limit}&offset=${offset}`
    );
  },

  getProjectArtifacts(projectId: string): Promise<ProjectArtifactsResult> {
    return request<ProjectArtifactsResult>(`/api/v1/projects/${projectId}/artifacts`);
  },

  getUsageSummary(): Promise<UsageSummary> {
    return request<UsageSummary>('/api/v1/projects/usage-summary');
  },

  getWebflowStatus(): Promise<WebflowStatusResponse> {
    return request<WebflowStatusResponse>('/api/v1/webflow/status');
  },

  publishToWebflow(projectId: string): Promise<WebflowPublishResponse> {
    return request<WebflowPublishResponse>(`/api/v1/webflow/projects/${projectId}/publish`, {
      method: 'POST',
    });
  },

  getLinkedInStatus(): Promise<LinkedInStatusResponse> {
    return request<LinkedInStatusResponse>('/api/v1/linkedin/status');
  },

  getLinkedInConnectUrl(returnPath = '/blog'): Promise<{ authorize_url: string }> {
    return request<{ authorize_url: string }>(`/api/v1/linkedin/connect?return_path=${encodeURIComponent(returnPath)}`);
  },

  disconnectLinkedIn(): Promise<void> {
    return request<void>('/api/v1/linkedin/disconnect', {
      method: 'DELETE',
    });
  },

  publishToLinkedIn(payload: {
    article_title: string;
    article_summary?: string;
    article_url: string;
    commentary?: string;
  }): Promise<LinkedInPublishResult> {
    return request<LinkedInPublishResult>('/api/v1/linkedin/publish', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  publishLinkedInPost(text: string): Promise<LinkedInPublishResult> {
    return request<LinkedInPublishResult>('/api/v1/linkedin/publish-post', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },
};
