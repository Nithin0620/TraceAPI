"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { HeaderKV, SavedRequest, Tab } from "./types";
import { ResizableSidebar } from "./Resizable";
import {
  HISTORY_LIMIT,
  SAVED_LIMIT,
  loadHistory,
  loadSavedRequests,
  saveHistory,
  saveSavedRequests,
  tabToHistory,
  tabToSaved,
} from "./storage";
import { defaultDraft, groqChat, methodColor, sendRequest, uid } from "./utils";

function cloneHeaders(h: HeaderKV[]) {
  return h.map((x) => ({ ...x }));
}

function tryFormatJson(text: string) {
  const t = text.trim();
  if (!t) return { ok: true as const, formatted: "" };
  try {
    const parsed = JSON.parse(t);
    return { ok: true as const, formatted: JSON.stringify(parsed, null, 2) };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

function safeCopy(text: string) {
  try {
    void navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function tabTitleFromUrl(url: string, method: string) {
  try {
    const u = new URL(url);
    return `${method} ${u.host}${u.pathname === "/" ? "" : u.pathname}`;
  } catch {
    return url ? `${method} ${url}` : `${method} request`;
  }
}

function prettyJson(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function useToasts() {
  const [toasts, setToasts] = useState<Array<{ id: string; kind: "info" | "error"; text: string }>>(
    [],
  );
  const push = (kind: "info" | "error", text: string) => {
    const id = uid("toast");
    setToasts((t) => [...t, { id, kind, text }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };
  return { toasts, push };
}

export function TestApiApp() {
  const { toasts, push } = useToasts();

  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [rightTab, setRightTab] = useState<"saved" | "history" | "chat">("saved");

  const [saved, setSaved] = useState<SavedRequest[]>([]);
  useEffect(() => setSaved(loadSavedRequests()), []);

  const [history, setHistory] = useState<SavedRequest[]>([]);
  useEffect(() => setHistory(loadHistory()), []);

  // On small screens, start collapsed for speed + space.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1024px)").matches) {
      setLeftCollapsed(true);
      setRightCollapsed(true);
    }
  }, []);

  const [tabs, setTabs] = useState<Tab[]>(() => {
    const id = uid("tab");
    return [
      {
        id,
        title: "New request",
        draft: defaultDraft(),
      },
    ];
  });
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");

  const active = useMemo(() => tabs.find((t) => t.id === activeId) ?? tabs[0], [activeId, tabs]);

  function updateActiveDraft(patch: Partial<Tab["draft"]>) {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? { ...t, title: tabTitleFromUrl(patch.url ?? t.draft.url, patch.method ?? t.draft.method), draft: { ...t.draft, ...patch } }
          : t,
      ),
    );
  }

  function updateActiveHeaders(next: HeaderKV[]) {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeId ? { ...t, draft: { ...t.draft, headers: next } } : t)),
    );
  }

  async function runActiveRequest() {
    if (!active) return;
    if (!active.draft.url.trim()) {
      push("error", "Enter an API URL first.");
      return;
    }

    if (active.draft.method === "POST" || active.draft.method === "PUT") {
      const check = tryFormatJson(active.draft.body);
      if (!check.ok) {
        push("error", `Body JSON invalid: ${check.error}`);
        return;
      }
    }

    const res = await sendRequest(active.draft);
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeId ? { ...t, response: res, aiExplain: undefined, lastRunAt: Date.now() } : t,
      ),
    );

    // History (auto-record)
    setHistory((prev) => {
      const item = tabToHistory({ ...active, response: res });
      const next = [item, ...prev.filter((x) => !(x.draft.method === item.draft.method && x.draft.url === item.draft.url))].slice(
        0,
        HISTORY_LIMIT,
      );
      try {
        saveHistory(next);
      } catch {
        // ignore
      }
      return next;
    });

    // AI recommendation panel
    try {
      const explain = await groqChat([
        {
          role: "system",
          content:
            "You are an API testing assistant. Explain responses for beginners. Be concise, actionable, and point out likely mistakes (auth headers, JSON formatting, URL, method, CORS, etc.).",
        },
        {
          role: "user",
          content: [
            `Request: ${active.draft.method} ${active.draft.url}`,
            `Response status: ${res.status ?? "NETWORK_ERROR"}`,
            `Response time: ${res.timeMs ?? "?"}ms`,
            res.error ? `Error: ${res.error}` : "",
            `Body (truncated to 2000 chars):\n${(res.bodyText ?? "").slice(0, 2000)}`,
            "",
            "Explain what this likely means and what to try next.",
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ]);
      setTabs((prev) => prev.map((t) => (t.id === activeId ? { ...t, aiExplain: explain } : t)));
    } catch (e) {
      push("error", e instanceof Error ? e.message : "AI request failed");
    }
  }

  function addTab() {
    const id = uid("tab");
    const tab: Tab = { id, title: "New request", draft: defaultDraft() };
    setTabs((t) => [...t, tab]);
    setActiveId(id);
  }

  function saveTab(tab: Tab) {
    setSaved((prev) => {
      const existing = prev.filter((x) => x.id !== tab.id);
      if (existing.length >= SAVED_LIMIT) {
        push("error", "Storage limit reached");
        return prev;
      }
      const next = [tabToSaved(tab), ...existing].slice(0, SAVED_LIMIT);
      try {
        saveSavedRequests(next);
      } catch {
        push("error", "Failed to write to localStorage");
      }
      push("info", "Saved.");
      return next;
    });
  }

  function deleteSaved(id: string) {
    setSaved((prev) => {
      const next = prev.filter((x) => x.id !== id);
      try {
        saveSavedRequests(next);
      } catch {
        // ignore
      }
      return next;
    });
  }

  function closeTab(id: string) {
    const tab = tabs.find((t) => t.id === id);
    if (!tab) return;
    const doSave = window.confirm("Do you want to save this request?");
    if (doSave) saveTab(tab);

    const remaining = tabs.filter((t) => t.id !== id);
    if (remaining.length === 0) {
      const newId = uid("tab");
      const nextTab: Tab = { id: newId, title: "New request", draft: defaultDraft() };
      setTabs([nextTab]);
      setActiveId(newId);
      return;
    }
    setTabs(remaining);
    if (activeId === id) setActiveId(remaining[0]?.id ?? "");
  }

  function loadSavedIntoTab(item: SavedRequest) {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? { ...t, title: item.title, draft: { ...item.draft, headers: cloneHeaders(item.draft.headers) }, response: undefined, aiExplain: undefined }
          : t,
      ),
    );
    push("info", "Loaded saved request into active tab.");
  }

  // AI Chat commands: “Send GET request to https://example.com”
  const [chat, setChat] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: 'Try: “Send GET request to https://example.com”',
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  async function handleChatSend() {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");
    setChat((c) => [...c, { role: "user", content: text }]);

    const m =
      text.match(/send\s+(get|post|put|delete)\s+request\s+to\s+(https?:\/\/\S+)/i) ??
      text.match(/^(get|post|put|delete)\s+(https?:\/\/\S+)/i);
    if (m && active) {
      const method = m[1].toUpperCase();
      const url = m[2];
      updateActiveDraft({ method: method as Tab["draft"]["method"], url });
      await runActiveRequest();
      setChat((c) => [...c, { role: "assistant", content: `Done. Sent ${method} to ${url}.` }]);
      return;
    }

    try {
      const content = await groqChat([
        {
          role: "system",
          content:
            "You are TraceAPI chat. Help the user test APIs. If the user asks to send a request, respond with a short actionable instruction in the format: SEND <METHOD> <URL>. Otherwise answer briefly.",
        },
        ...chat
          .slice(-8)
          .map((x) => ({ role: x.role, content: x.content } as const)),
        { role: "user", content: text },
      ]);

      const send = content.match(/SEND\s+(GET|POST|PUT|DELETE)\s+(https?:\/\/\S+)/);
      if (send && active) {
        const method = send[1] as Tab["draft"]["method"];
        const url = send[2];
        updateActiveDraft({ method, url });
        await runActiveRequest();
        setChat((c) => [...c, { role: "assistant", content: `Done. Sent ${method} to ${url}.` }]);
        return;
      }

      setChat((c) => [...c, { role: "assistant", content }]);
    } catch (e) {
      setChat((c) => [
        ...c,
        { role: "assistant", content: `AI error: ${e instanceof Error ? e.message : String(e)}` },
      ]);
    }
  }

  return (
    <div className="flex-1 min-h-0">
      <div className="mx-auto max-w-[1400px] px-4 py-4">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          <div className="tabs tabs-boxed bg-base-200/40 border msp-border">
            {tabs.map((t) => (
              <div key={t.id} className="tab gap-2">
                <button
                  className={[
                    "btn btn-ghost btn-xs",
                    activeId === t.id ? "text-primary font-semibold" : "text-base-content/70",
                  ].join(" ")}
                  onClick={() => setActiveId(t.id)}
                >
                  <span className={["badge badge-sm", methodColor(t.draft.method)].join(" ")}>
                    {t.draft.method}
                  </span>
                  <span className="truncate max-w-[200px]">{t.title}</span>
                </button>
                <button className="btn btn-ghost btn-xs" onClick={() => closeTab(t.id)} aria-label="Close tab">
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button className="btn btn-sm btn-primary rounded-full" onClick={addTab}>
            + New tab
          </button>
        </div>

        {/* Workspace */}
        <div className="mt-4 h-[calc(100vh-150px)] min-h-[560px] flex overflow-hidden rounded-2xl border msp-border bg-base-200/30">
          <ResizableSidebar
            side="left"
            title="Request"
            initialWidth={360}
            collapsed={leftCollapsed}
            onCollapsedChange={setLeftCollapsed}
          >
            {!active ? null : (
              <div className="p-4 space-y-4">
                <div className="flex gap-2">
                  <select
                    className="select select-bordered w-32"
                    value={active.draft.method}
                    onChange={(e) => updateActiveDraft({ method: e.target.value as Tab["draft"]["method"] })}
                  >
                    {(["GET", "POST", "PUT", "DELETE"] as const).map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <input
                    className="input input-bordered flex-1"
                    placeholder="https://api.example.com/v1/users"
                    value={active.draft.url}
                    onChange={(e) => updateActiveDraft({ url: e.target.value })}
                  />
                </div>

                <div className="flex gap-2">
                  <button className="btn btn-primary flex-1" onClick={runActiveRequest}>
                    Send
                  </button>
                  <button className="btn btn-ghost border msp-border" onClick={() => active && saveTab(active)}>
                    Save
                  </button>
                </div>

                <div className="divider my-0">Headers</div>
                <div className="space-y-2">
                  {active.draft.headers.map((h, idx) => (
                    <div key={h.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                      <input
                        className="input input-bordered input-sm"
                        placeholder="Header"
                        value={h.key}
                        onChange={(e) => {
                          const next = cloneHeaders(active.draft.headers);
                          next[idx] = { ...next[idx], key: e.target.value };
                          updateActiveHeaders(next);
                        }}
                      />
                      <input
                        className="input input-bordered input-sm"
                        placeholder="Value"
                        value={h.value}
                        onChange={(e) => {
                          const next = cloneHeaders(active.draft.headers);
                          next[idx] = { ...next[idx], value: e.target.value };
                          updateActiveHeaders(next);
                        }}
                      />
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => updateActiveHeaders(active.draft.headers.filter((x) => x.id !== h.id))}
                        aria-label="Remove header"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-ghost btn-sm border msp-border w-full"
                    onClick={() =>
                      updateActiveHeaders([
                        ...active.draft.headers,
                        { id: uid("h"), key: "", value: "" },
                      ])
                    }
                  >
                    + Add header
                  </button>
                </div>

                <div className="divider my-0">Body (JSON)</div>
                <textarea
                  className="textarea textarea-bordered font-mono text-xs min-h-44"
                  value={active.draft.body}
                  onChange={(e) => updateActiveDraft({ body: e.target.value })}
                  placeholder='{\n  "name": "Jane"\n}'
                />
                <div className="flex gap-2">
                  <button
                    className="btn btn-ghost btn-sm border msp-border"
                    onClick={() => {
                      const out = tryFormatJson(active.draft.body);
                      if (!out.ok) {
                        push("error", `Body JSON invalid: ${out.error}`);
                        return;
                      }
                      updateActiveDraft({ body: out.formatted || "{\n  \n}" });
                      push("info", "Formatted JSON.");
                    }}
                  >
                    Format JSON
                  </button>
                  <button
                    className="btn btn-ghost btn-sm border msp-border"
                    onClick={() => {
                      if (safeCopy(active.draft.body)) push("info", "Copied.");
                      else push("error", "Copy failed.");
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div className="text-xs text-base-content/60">
                  Body is sent for POST/PUT only. (GET/DELETE ignores body.)
                </div>
              </div>
            )}
          </ResizableSidebar>

          <div className="flex-1 min-w-0 bg-base-100">
            {!active ? null : (
              <div className="h-full overflow-auto p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={["badge", methodColor(active.draft.method)].join(" ")}>
                    {active.draft.method}
                  </span>
                  <div className="text-sm text-base-content/70 truncate">{active.draft.url || "—"}</div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="badge badge-outline">
                      Status: {active.response?.status ?? (active.response?.error ? "Error" : "—")}
                    </span>
                    <span className="badge badge-outline">
                      Time: {active.response?.timeMs ?? "—"}ms
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2 items-start">
                  <div className="rounded-2xl border msp-border bg-base-100 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold">Response</div>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => {
                          const text =
                            active.response?.json != null
                              ? prettyJson(active.response.json)
                              : active.response?.bodyText ?? "";
                          if (!text) return;
                          if (safeCopy(text)) push("info", "Copied response.");
                          else push("error", "Copy failed.");
                        }}
                        disabled={!active.response}
                      >
                        Copy
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-base-content/60">
                      {active.response?.error ? active.response.error : " "}
                    </div>
                    <pre className="mt-3 rounded-xl bg-base-200/40 p-3 text-xs overflow-auto">
                      {active.response
                        ? active.response.json
                          ? prettyJson(active.response.json)
                          : active.response.bodyText || ""
                        : "Send a request to see results."}
                    </pre>
                  </div>

                  <div className="rounded-2xl border msp-border bg-base-100 p-4">
                    <div className="text-sm font-semibold">AI recommendation</div>
                    <div className="mt-3 whitespace-pre-wrap text-sm leading-6 text-base-content/80">
                      {active.aiExplain
                        ? active.aiExplain
                        : "After you send a request, AI will explain the response and suggest fixes (headers, auth, JSON, URL, etc.)."}
                    </div>
                    <div className="mt-4 text-xs text-base-content/60">
                      Requires <code>GROQ_API_KEY</code> in your environment.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <ResizableSidebar
            side="right"
            title="Saved / AI"
            initialWidth={380}
            collapsed={rightCollapsed}
            onCollapsedChange={setRightCollapsed}
          >
            <div className="p-3">
              <div className="tabs tabs-bordered">
                <button
                  className={["tab", rightTab === "saved" ? "tab-active" : ""].join(" ")}
                  onClick={() => setRightTab("saved")}
                >
                  Saved
                </button>
                <button
                  className={["tab", rightTab === "history" ? "tab-active" : ""].join(" ")}
                  onClick={() => setRightTab("history")}
                >
                  History
                </button>
                <button
                  className={["tab", rightTab === "chat" ? "tab-active" : ""].join(" ")}
                  onClick={() => setRightTab("chat")}
                >
                  AI Chat
                </button>
              </div>
            </div>

            {rightTab === "saved" ? (
              <div className="px-3 pb-4">
                <div className="text-xs text-base-content/60">
                  Saved requests are stored locally (limit {SAVED_LIMIT}).
                </div>
                <div className="mt-3 space-y-2">
                  {saved.length === 0 ? (
                    <div className="text-sm text-base-content/70">No saved requests yet.</div>
                  ) : (
                    saved.map((s) => (
                      <div
                        key={s.id}
                        className="w-full rounded-xl border msp-border bg-base-100 p-3 hover:bg-base-200/40 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <button className="text-left min-w-0 flex-1" onClick={() => loadSavedIntoTab(s)}>
                            <div className="text-sm font-medium truncate">{s.title}</div>
                            <div className="mt-1 text-xs text-base-content/60 truncate">
                              {s.draft.method} • {s.draft.url}
                            </div>
                          </button>
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => deleteSaved(s.id)}
                            aria-label="Delete saved request"
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : rightTab === "history" ? (
              <div className="px-3 pb-4">
                <div className="text-xs text-base-content/60">
                  Last runs (limit {HISTORY_LIMIT}). Stored locally.
                </div>
                <div className="mt-3 space-y-2">
                  {history.length === 0 ? (
                    <div className="text-sm text-base-content/70">No history yet. Send a request.</div>
                  ) : (
                    history.map((h, idx) => (
                      <div
                        key={`${h.savedAt}-${idx}`}
                        className="w-full rounded-xl border msp-border bg-base-100 p-3 hover:bg-base-200/40 transition-colors"
                      >
                        <button className="text-left w-full" onClick={() => loadSavedIntoTab(h)}>
                          <div className="text-sm font-medium truncate">{h.title}</div>
                          <div className="mt-1 text-xs text-base-content/60 truncate">
                            {h.draft.method} • {h.draft.url}
                          </div>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="px-3 pb-4 h-[calc(100%-92px)] flex flex-col">
                <div className="flex-1 overflow-auto space-y-2 pr-1">
                  {chat.map((m, i) => (
                    <div
                      key={i}
                      className={[
                        "rounded-2xl px-3 py-2 text-sm leading-6",
                        m.role === "user"
                          ? "ml-auto bg-primary text-primary-content max-w-[85%]"
                          : "mr-auto bg-base-200/60 text-base-content max-w-[85%]",
                      ].join(" ")}
                    >
                      {m.content}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    className="input input-bordered flex-1"
                    placeholder='Send GET request to https://example.com'
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleChatSend();
                    }}
                  />
                  <button className="btn btn-primary" onClick={handleChatSend}>
                    Send
                  </button>
                </div>
              </div>
            )}
          </ResizableSidebar>
        </div>
      </div>

      {/* Toasts */}
      <div className="toast toast-end z-50">
        {toasts.map((t) => (
          <div key={t.id} className={["alert", t.kind === "error" ? "alert-error" : "alert-info"].join(" ")}>
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

