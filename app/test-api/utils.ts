import type { HeaderKV, HttpMethod, RequestDraft, ResponseData } from "./types";

export function uid(prefix = "id") {
  const s = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
  return `${prefix}-${s}`;
}

export function defaultDraft(): RequestDraft {
  return {
    method: "GET",
    url: "",
    headers: [{ id: uid("h"), key: "Content-Type", value: "application/json" }],
    body: "{\n  \n}",
  };
}

export function methodColor(method: HttpMethod) {
  switch (method) {
    case "GET":
      return "badge-info";
    case "POST":
      return "badge-success";
    case "PUT":
      return "badge-warning";
    case "DELETE":
      return "badge-error";
  }
}

export async function sendRequest(draft: RequestDraft): Promise<ResponseData> {
  const start = performance.now();
  const headers: Record<string, string> = {};
  for (const h of draft.headers) {
    const k = h.key.trim();
    if (!k) continue;
    headers[k] = h.value;
  }

  let body: string | undefined = undefined;
  if (draft.method !== "GET" && draft.method !== "DELETE") {
    const t = draft.body?.trim();
    if (t) body = t;
  }

  try {
    const isAbsoluteHttp = draft.url.startsWith("http://") || draft.url.startsWith("https://");

    // Use server proxy for absolute URLs to avoid browser CORS failures
    // (e.g. localhost -> 127.0.0.1 is cross-origin).
    const res = isAbsoluteHttp
      ? await fetch("/api/proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: draft.url,
            method: draft.method,
            headers,
            body,
          }),
        })
      : await fetch(draft.url, { method: draft.method, headers, body });

    const timeMs = Math.round(performance.now() - start);

    // Proxy returns JSON with response details; direct fetch returns the upstream body.
    let resText = "";
    let resHeaders: Record<string, string> = {};
    let status: number | null = null;
    let statusText: string | undefined = undefined;

    if (isAbsoluteHttp) {
      const payload = (await res.json()) as {
        status: number;
        statusText?: string;
        timeMs?: number;
        headers: Record<string, string>;
        bodyText: string;
      };
      status = payload.status;
      statusText = payload.statusText;
      resHeaders = payload.headers ?? {};
      resText = payload.bodyText ?? "";
    } else {
      status = res.status;
      statusText = res.statusText;
      resText = await res.text();
      res.headers.forEach((v, k) => (resHeaders[k] = v));
    }

    const out: ResponseData = {
      status,
      statusText,
      timeMs,
      headers: resHeaders,
      bodyText: resText,
    };

    const ct = res.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      try {
        out.json = JSON.parse(resText);
      } catch {
        // keep as text
      }
    } else {
      // best-effort JSON parse for APIs missing content-type
      const t = resText.trim();
      if (t.startsWith("{") || t.startsWith("[")) {
        try {
          out.json = JSON.parse(resText);
        } catch {
          // ignore
        }
      }
    }

    return out;
  } catch (e) {
    const timeMs = Math.round(performance.now() - start);
    return {
      status: null,
      timeMs,
      headers: {},
      bodyText: "",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export async function groqChat(messages: Array<{ role: "system" | "user" | "assistant"; content: string }>) {
  const res = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const json = (await res.json()) as { content?: string; error?: string; detail?: string };
  if (!res.ok) throw new Error(json.error ?? "AI request failed");
  return json.content ?? "";
}

export function headersToObject(headers: HeaderKV[]) {
  const out: Record<string, string> = {};
  for (const h of headers) {
    const k = h.key.trim();
    if (!k) continue;
    out[k] = h.value;
  }
  return out;
}

