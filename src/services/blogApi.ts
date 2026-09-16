import {
  ApiErrorPayload,
  ContentGenerateRequest,
  ContentGenerateResult,
  ProjectArtifactsResult,
  ProjectListResult,
  UsageSummary,
  WebflowPublishResponse,
  WebflowStatusResponse,
  WebflowSitesResult,
  WebflowCollectionsResult,
  WebflowFieldsResult,
  WebflowConnectRequest,
  LinkedInStatusResponse,
  LinkedInPublishResult,
  LinkedInGenerateRequest,
  LinkedInGenerateResult,
  LinkedInHashtagSuggestRequest,
  LinkedInHashtagSuggestResult,
  ImageBatchUploadResult,
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
    // FormData bodies (multipart file uploads) must NOT have an
    // explicit Content-Type set — the browser generates the
    // multipart boundary itself and setting it manually breaks parsing.
    const isFormData = init?.body instanceof FormData;
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
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

  getWebflowSites(): Promise<WebflowSitesResult> {
    return request<WebflowSitesResult>('/api/v1/webflow/sites');
  },

  getWebflowCollections(siteId: string): Promise<WebflowCollectionsResult> {
    return request<WebflowCollectionsResult>(`/api/v1/webflow/collections?site_id=${encodeURIComponent(siteId)}`);
  },

  getWebflowFields(collectionId: string): Promise<WebflowFieldsResult> {
    return request<WebflowFieldsResult>(`/api/v1/webflow/collections/${encodeURIComponent(collectionId)}/fields`);
  },

  connectWebflow(payload: WebflowConnectRequest): Promise<WebflowStatusResponse> {
    return request<WebflowStatusResponse>('/api/v1/webflow/connect', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  disconnectWebflow(): Promise<void> {
    return request<void>('/api/v1/webflow/disconnect', {
      method: 'DELETE',
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

  publishLinkedInPost(
    text: string,
    image?: File | null,
    imageUrl?: string | null,
    video?: File | null
  ): Promise<LinkedInPublishResult> {
    const formData = new FormData();
    formData.append('text', text);
    if (video) {
      // Video takes priority server-side too if somehow both are set.
      formData.append('video', video);
    } else if (image) {
      // A device-uploaded file takes priority over a URL if somehow
      // both are set.
      formData.append('image', image);
    } else if (imageUrl) {
      formData.append('image_url', imageUrl);
    }
    return request<LinkedInPublishResult>('/api/v1/linkedin/publish-post', {
      method: 'POST',
      body: formData,
    });
  },

  generateLinkedInContent(payload: LinkedInGenerateRequest): Promise<LinkedInGenerateResult> {
    return request<LinkedInGenerateResult>('/api/v1/linkedin/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  suggestLinkedInHashtags(payload: LinkedInHashtagSuggestRequest): Promise<LinkedInHashtagSuggestResult> {
    return request<LinkedInHashtagSuggestResult>('/api/v1/linkedin/hashtags/suggest', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  uploadImages(files: File[]): Promise<ImageBatchUploadResult> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return request<ImageBatchUploadResult>('/api/v1/images/upload', {
      method: 'POST',
      body: formData,
    });
  },
};
