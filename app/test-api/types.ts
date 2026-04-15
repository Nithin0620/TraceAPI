export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type HeaderKV = { id: string; key: string; value: string };

export type RequestDraft = {
  method: HttpMethod;
  url: string;
  headers: HeaderKV[];
  body: string; // JSON text
};

export type ResponseData = {
  status: number | null;
  statusText?: string;
  timeMs: number | null;
  headers: Record<string, string>;
  bodyText: string;
  json?: unknown;
  error?: string;
};

export type Tab = {
  id: string;
  title: string;
  draft: RequestDraft;
  response?: ResponseData;
  aiExplain?: string;
  lastRunAt?: number;
};

export type SavedRequest = {
  id: string;
  savedAt: number;
  title: string;
  draft: RequestDraft;
};

