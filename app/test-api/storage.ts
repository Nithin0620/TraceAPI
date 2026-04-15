import type { SavedRequest, Tab } from "./types";

const SAVED_KEY = "traceapi.savedRequests";
const HISTORY_KEY = "traceapi.historyRequests";
export const SAVED_LIMIT = 10;
export const HISTORY_LIMIT = 10;

export function loadSavedRequests(): SavedRequest[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedRequest[];
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, SAVED_LIMIT);
  } catch {
    return [];
  }
}

export function saveSavedRequests(list: SavedRequest[]) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(list.slice(0, SAVED_LIMIT)));
}

export function tabToSaved(tab: Tab): SavedRequest {
  return {
    id: tab.id,
    savedAt: Date.now(),
    title: tab.title,
    draft: tab.draft,
  };
}

export function loadHistory(): SavedRequest[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedRequest[];
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

export function saveHistory(list: SavedRequest[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, HISTORY_LIMIT)));
}

export function tabToHistory(tab: Tab): SavedRequest {
  return {
    id: tab.id,
    savedAt: Date.now(),
    title: tab.title,
    draft: tab.draft,
  };
}

