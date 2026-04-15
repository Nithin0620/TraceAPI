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
    const res = await fetch(draft.url, {
      method: draft.method,
      headers,
      body,
    });

    const timeMs = Math.round(performance.now() - start);
    const resText = await res.text();
    const resHeaders: Record<string, string> = {};
    res.headers.forEach((v, k) => (resHeaders[k] = v));

    const out: ResponseData = {
      status: res.status,
      statusText: res.statusText,
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

