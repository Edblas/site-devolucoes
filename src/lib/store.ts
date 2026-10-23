import { useSyncExternalStore } from "react";
import { SEED_CATEGORIES, SEED_TEMPLATES } from "./seed";

export type Category = { id: string; name: string; icon: string };
export type Template = { id: string; categoryId: string; title: string; text: string };
export type Models = { categories: Category[]; templates: Template[] };
type UsageByMonth = Record<string, Record<string, number>>;
type State = Models & {
  favorites: string[];
  recents: string[];
  usage: Record<string, number>;
  usageByMonth: UsageByMonth;
  isAdmin: boolean;
};

export const ADMIN_DEFAULT_PASSWORD = "sisbrsicoob123";

const KEYS = {
  favorites: "cd.favorites.v1",
  recents: "cd.recents.v1",
  usage: "cd.usage.v1",
  usageByMonth: "cd.usage-by-month.v1",
  models: "cd.models.v2",
  admin: "cd.admin.v1",
};
const MAX_RECENTS = 10;
const MAX_MOST_USED = 10;

const FIELD_RE = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;

export function displayText(text: string): string {
  return text.replace(FIELD_RE, (_, k: string) => `(${k})`);
}

export function seedModels(): Models {
  return {
    categories: SEED_CATEGORIES.map((c) => ({ ...c })),
    templates: SEED_TEMPLATES.map((t) => ({ ...t })),
  };
}

const initial: State = { ...seedModels(), favorites: [], recents: [], usage: {}, usageByMonth: {}, isAdmin: false };
let state: State = initial;
let loaded = false;
const listeners = new Set<() => void>();

function getMonthKey(date = new Date()) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function sumUsage(usage: Record<string, number>) {
  return Object.values(usage).reduce((sum, value) => sum + value, 0);
}

function sumUsageByMonth(usageByMonth: UsageByMonth) {
  return Object.values(usageByMonth).reduce((sum, monthUsage) => sum + sumUsage(monthUsage), 0);
}

function isValidModels(value: unknown): value is Models {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Models>;
  return Array.isArray(candidate.categories) && Array.isArray(candidate.templates);
}

function createTemplateId() {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function requireAdmin() {
  load();
  return state.isAdmin;
}

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
  const savedModels = read<unknown>(KEYS.models, null);
  const usage = read<Record<string, number>>(KEYS.usage, {});
  const usageByMonth = read<UsageByMonth>(KEYS.usageByMonth, {});
  const currentMonth = getMonthKey();
  const totalUsage = sumUsage(usage);
  const totalUsageByMonth = sumUsageByMonth(usageByMonth);
  const models = isValidModels(savedModels) ? savedModels : seedModels();

  // Migra cliques antigos salvos apenas no total geral para o mês atual.
  if (totalUsage > 0 && totalUsageByMonth === 0) {
    usageByMonth[currentMonth] = { ...usage };
  }

  state = {
    ...models,
    favorites: read<string[]>(KEYS.favorites, []),
    recents: read<string[]>(KEYS.recents, []),
    usage,
    usageByMonth,
    isAdmin: read<boolean>(KEYS.admin, false),
  };
}

function persist() {
  try {
    localStorage.setItem(KEYS.models, JSON.stringify({ categories: state.categories, templates: state.templates }));
    localStorage.setItem(KEYS.favorites, JSON.stringify(state.favorites));
    localStorage.setItem(KEYS.recents, JSON.stringify(state.recents));
    localStorage.setItem(KEYS.usage, JSON.stringify(state.usage));
    localStorage.setItem(KEYS.usageByMonth, JSON.stringify(state.usageByMonth));
    localStorage.setItem(KEYS.admin, JSON.stringify(state.isAdmin));
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

export const actions = {
  loginAdmin(password: string) {
    load();
    const ok = password === ADMIN_DEFAULT_PASSWORD;
    if (ok) set({ isAdmin: true });
    return ok;
  },
  logoutAdmin() {
    set({ isAdmin: false });
  },
  toggleFavorite(id: string) {
    load();
    const f = state.favorites.includes(id) ? state.favorites.filter((x) => x !== id) : [...state.favorites, id];
    set({ favorites: f });
  },
  registerCopy(id: string) {
    load();
    const monthKey = getMonthKey();
    const monthUsage = state.usageByMonth[monthKey] ?? {};
    set({
      recents: [id, ...state.recents.filter((x) => x !== id)].slice(0, MAX_RECENTS),
      usage: { ...state.usage, [id]: (state.usage[id] ?? 0) + 1 },
      usageByMonth: {
        ...state.usageByMonth,
        [monthKey]: {
          ...monthUsage,
          [id]: (monthUsage[id] ?? 0) + 1,
        },
      },
    });
  },
  clearRecents() {
    set({ recents: [] });
  },
  clearUsage() {
    set({ usage: {}, usageByMonth: {} });
  },
  renameCategory(id: string, name: string) {
    if (!requireAdmin()) return;
    const next = name.trim();
    if (!next) return;
    set({
      categories: state.categories.map((category) => (category.id === id ? { ...category, name: next } : category)),
    });
  },
  addTemplate(categoryId: string, title: string, text: string) {
    if (!requireAdmin()) return;
    const nextTitle = title.trim();
    const nextText = text.trim();
    if (!nextTitle || !nextText) return;
    set({
      templates: [
        ...state.templates,
        { id: createTemplateId(), categoryId, title: nextTitle, text: nextText },
      ],
    });
  },
  updateTemplate(id: string, title: string, text: string) {
    if (!requireAdmin()) return;
    const nextTitle = title.trim();
    const nextText = text.trim();
    if (!nextTitle || !nextText) return;
    set({
      templates: state.templates.map((template) => (
        template.id === id ? { ...template, title: nextTitle, text: nextText } : template
      )),
    });
  },
  deleteTemplate(id: string) {
    if (!requireAdmin()) return;
    const templates = state.templates.filter((template) => template.id !== id);
    const favorites = state.favorites.filter((favoriteId) => favoriteId !== id);
    const recents = state.recents.filter((recentId) => recentId !== id);
    const { [id]: _ignoredUsage, ...usage } = state.usage;
    const usageByMonth = Object.fromEntries(
      Object.entries(state.usageByMonth).map(([monthKey, monthUsage]) => {
        const { [id]: _ignoredMonthUsage, ...nextMonthUsage } = monthUsage;
        return [monthKey, nextMonthUsage];
      }),
    );
    set({ templates, favorites, recents, usage, usageByMonth });
  },
};

export function mostUsed(templates: Template[], usage: Record<string, number>, limit = MAX_MOST_USED): Template[] {
  return templates
    .filter((t) => (usage[t.id] ?? 0) > 0)
    .sort((a, b) => (usage[b.id] ?? 0) - (usage[a.id] ?? 0))
    .slice(0, limit);
}

export function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
