import { useSyncExternalStore } from "react";
import { SEED_CATEGORIES, SEED_TEMPLATES } from "./seed";

export type Category = { id: string; name: string; icon: string };
export type Template = { id: string; categoryId: string; title: string; text: string };
export type Models = { categories: Category[]; templates: Template[] };
type State = Models & { favorites: string[]; recents: string[] };

const KEYS = { models: "cd.models.v1", favorites: "cd.favorites.v1", recents: "cd.recents.v1" };
const MAX_RECENTS = 10;

export const FIELD_RE = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;

export function extractFields(text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(FIELD_RE)) if (!out.includes(m[1]!)) out.push(m[1]!);
  return out;
}

export function fieldLabel(name: string): string {
  const s = name.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function fillTemplate(text: string, values: Record<string, string>): string {
  return text.replace(FIELD_RE, (_, k: string) => values[k] ?? "");
}

export function seedModels(): Models {
  return {
    categories: SEED_CATEGORIES.map((c) => ({ ...c })),
    templates: SEED_TEMPLATES.map((t) => ({ ...t })),
  };
}

const initial: State = { ...seedModels(), favorites: [], recents: [] };
let state: State = initial;
let loaded = false;
const listeners = new Set<() => void>();

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const models = read<Models | null>(KEYS.models, null);
  state = {
    ...(models && isValidModels(models) ? models : seedModels()),
    favorites: read<string[]>(KEYS.favorites, []),
    recents: read<string[]>(KEYS.recents, []),
  };
}

function persist() {
  try {
    localStorage.setItem(KEYS.models, JSON.stringify({ categories: state.categories, templates: state.templates }));
    localStorage.setItem(KEYS.favorites, JSON.stringify(state.favorites));
    localStorage.setItem(KEYS.recents, JSON.stringify(state.recents));
  } catch {
    /* storage full or blocked */
  }
}

function set(patch: Partial<State>) {
  load();
  state = { ...state, ...patch };
  persist();
  listeners.forEach((l) => l());
}

export function useStore(): State {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => {
      load();
      return state;
    },
    () => initial,
  );
}

export function isValidModels(m: unknown): m is Models {
  if (!m || typeof m !== "object") return false;
  const o = m as Models;
  return (
    Array.isArray(o.categories) &&
    Array.isArray(o.templates) &&
    o.categories.every((c) => typeof c.id === "string" && typeof c.name === "string") &&
    o.templates.every(
      (t) => typeof t.id === "string" && typeof t.categoryId === "string" && typeof t.title === "string" && typeof t.text === "string",
    )
  );
}

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export const actions = {
  toggleFavorite(id: string) {
    load();
    const f = state.favorites.includes(id) ? state.favorites.filter((x) => x !== id) : [...state.favorites, id];
    set({ favorites: f });
  },
  addRecent(id: string) {
    load();
    set({ recents: [id, ...state.recents.filter((x) => x !== id)].slice(0, MAX_RECENTS) });
  },
  clearRecents() {
    set({ recents: [] });
  },
  addCategory(name: string, icon = "folder") {
    load();
    set({ categories: [...state.categories, { id: uid(), name, icon }] });
  },
  updateCategory(id: string, patch: Partial<Category>) {
    load();
    set({ categories: state.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  },
  deleteCategory(id: string) {
    load();
    const removed = new Set(state.templates.filter((t) => t.categoryId === id).map((t) => t.id));
    set({
      categories: state.categories.filter((c) => c.id !== id),
      templates: state.templates.filter((t) => t.categoryId !== id),
      favorites: state.favorites.filter((f) => !removed.has(f)),
      recents: state.recents.filter((f) => !removed.has(f)),
    });
  },
  saveTemplate(t: Omit<Template, "id"> & { id?: string | undefined }) {
    load();
    if (t.id && state.templates.some((x) => x.id === t.id)) {
      set({ templates: state.templates.map((x) => (x.id === t.id ? (t as Template) : x)) });
    } else {
      set({ templates: [...state.templates, { ...t, id: uid() }] });
    }
  },
  deleteTemplate(id: string) {
    load();
    set({
      templates: state.templates.filter((t) => t.id !== id),
      favorites: state.favorites.filter((f) => f !== id),
      recents: state.recents.filter((f) => f !== id),
    });
  },
  restoreDefaults() {
    load();
    const m = seedModels();
    const ids = new Set(m.templates.map((t) => t.id));
    set({ ...m, favorites: state.favorites.filter((f) => ids.has(f)), recents: state.recents.filter((f) => ids.has(f)) });
  },
  importModels(m: Models) {
    load();
    const ids = new Set(m.templates.map((t) => t.id));
    set({
      categories: m.categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon || "folder" })),
      templates: m.templates.map((t) => ({ id: t.id, categoryId: t.categoryId, title: t.title, text: t.text })),
      favorites: state.favorites.filter((f) => ids.has(f)),
      recents: state.recents.filter((f) => ids.has(f)),
    });
  },
  exportModels(): Models {
    load();
    return { categories: state.categories, templates: state.templates };
  },
};

export function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
