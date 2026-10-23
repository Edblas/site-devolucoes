import { Copy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { actions, displayText, useStore, type Template } from "@/lib/store";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

const FIELD_SPLIT = /(\{\{\s*[a-zA-Z0-9_]+\s*\}\})/;
const FIELD_ONLY = /^\{\{\s*([a-zA-Z0-9_]+)\s*\}\}$/;

export function TemplateList({
  templates,
  showCategory,
  counts,
  empty,
}: {
  templates: Template[];
  showCategory?: boolean;
  counts?: Record<string, number>;
  empty?: string;
}) {
  const { favorites, categories } = useStore();
  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? "";

  const handleCopy = (t: Template) => {
    actions.registerCopy(t.id);
    copyText(displayText(t.text));
  };

  if (!templates.length) return <p className="rounded-lg border border-dashed bg-card p-6 text-center text-sm text-muted-foreground">{empty ?? "Nenhuma resposta encontrada."}</p>;

  return (
    <ul className="space-y-2">
      {templates.map((t) => {
        const fav = favorites.includes(t.id);
        return (
          <li key={t.id} className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              {showCategory && <p className="text-xs font-medium uppercase tracking-wide text-primary">{catName(t.categoryId)}</p>}
              <h3 className="font-semibold text-foreground">{t.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {t.text.split(FIELD_SPLIT).map((p, i) => {
                  const m = p.match(FIELD_ONLY);
                  return m ? (
                    <span key={i} className="rounded bg-accent px-1 font-medium text-accent-foreground">({m[1]})</span>
                  ) : (
                    <span key={i}>{p}</span>
                  );
                })}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {counts && (counts[t.id] ?? 0) > 0 && (
                <span className="rounded-full border px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground" title={`${counts[t.id]} cópias`}>
                  {counts[t.id]}
                </span>
              )}
              <Button size="sm" variant="action" onClick={() => handleCopy(t)}>
                <Copy /> Copiar resposta
              </Button>
              <Button
                size="icon"
                variant="ghost"
                aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                title={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                onClick={() => actions.toggleFavorite(t.id)}
              >
                <Star className={cn(fav && "fill-warning text-warning")} />
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
