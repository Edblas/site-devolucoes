import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, History, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TemplateList } from "@/components/TemplateList";
import { CategoryIcon } from "@/components/icons";
import { actions, normalize, useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Central de Devoluções — Respostas padronizadas" },
      { name: "description", content: "Encontre, personalize e copie respostas padronizadas de devolução de processos operacionais." },
      { property: "og:title", content: "Central de Devoluções" },
      { property: "og:description", content: "Respostas padronizadas para processos operacionais." },
    ],
  }),
  component: Index,
});

function Index() {
  const { categories, templates, favorites, recents } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const results = useMemo(() => {
    const n = normalize(q.trim());
    if (!n) return [];
    return templates
      .filter((t) => cat === "all" || t.categoryId === cat)
      .filter((t) => {
        const c = categories.find((x) => x.id === t.categoryId)?.name ?? "";
        return normalize(`${c} ${t.title} ${t.text}`).includes(n);
      })
      .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
  }, [q, cat, templates, categories]);

  const favList = templates.filter((t) => favorites.includes(t.id));
  const recentList = recents.map((id) => templates.find((t) => t.id === id)).filter((t) => !!t);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pesquisar processo, motivo ou palavra-chave..."
            className="h-14 rounded-lg bg-card pl-12 pr-12 text-base shadow-soft"
            aria-label="Pesquisar"
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Limpar pesquisa" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
          <span><strong className="text-foreground">{categories.length}</strong> tipos de processo</span>
          <span><strong className="text-foreground">{templates.length}</strong> respostas disponíveis</span>
          <span><strong className="text-foreground">{favList.length}</strong> favoritas</span>
        </div>
      </section>

      {q.trim() ? (
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">{results.length} resultado(s)</h2>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="h-9 rounded-md border border-input bg-card px-3 text-sm"
              aria-label="Filtrar por tipo de processo"
            >
              <option value="all">Todos os processos</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <TemplateList templates={results} showCategory />
        </section>
      ) : (
        <>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Tipos de processo</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((c) => {
                const count = templates.filter((t) => t.categoryId === c.id).length;
                return (
                  <Link
                    key={c.id}
                    to="/processo/$id"
                    params={{ id: c.id }}
                    className="group flex items-center gap-3 rounded-lg border bg-card p-4 shadow-soft transition-colors hover:border-primary"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                      <CategoryIcon name={c.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{count} {count === 1 ? "resposta" : "respostas"}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold"><Star className="h-5 w-5 text-warning" /> Favoritos</h2>
            <TemplateList templates={favList} showCategory empty="Clique na estrela de uma resposta para adicioná-la aos favoritos." />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold"><History className="h-5 w-5 text-primary" /> Recentes</h2>
              {recentList.length > 0 && <Button size="sm" variant="ghost" onClick={actions.clearRecents}>Limpar</Button>}
            </div>
            <TemplateList templates={recentList} showCategory empty="As respostas consultadas aparecerão aqui." />
          </section>
        </>
      )}
    </div>
  );
}
