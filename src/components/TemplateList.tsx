import { useState } from "react";
import { Copy, PencilLine, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FillDialog } from "./FillDialog";
import { actions, extractFields, useStore, type Template } from "@/lib/store";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

export function TemplateList({ templates, showCategory, empty }: { templates: Template[]; showCategory?: boolean; empty?: string }) {
  const { favorites, categories } = useStore();
  const [active, setActive] = useState<Template | null>(null);
  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? "";

  const handleCopy = (t: Template) => {
    actions.addRecent(t.id);
    if (extractFields(t.text).length) setActive(t);
    else copyText(t.text);
  };

  if (!templates.length) return <p className="rounded-lg border border-dashed bg-card p-6 text-center text-sm text-muted-foreground">{empty ?? "Nenhuma resposta encontrada."}</p>;

  return (
    <>
      <ul className="space-y-2">
        {templates.map((t) => {
          const hasFields = extractFields(t.text).length > 0;
          const fav = favorites.includes(t.id);
          return (
            <li key={t.id} className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                {showCategory && <p className="text-xs font-medium uppercase tracking-wide text-primary">{catName(t.categoryId)}</p>}
                <h3 className="font-semibold text-foreground">{t.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {t.text.split(/(\{\{\s*[a-zA-Z0-9_]+\s*\}\})/).map((p, i) =>
                    /^\{\{/.test(p) ? <span key={i} className="rounded bg-accent px-1 font-medium text-accent-foreground">{p}</span> : p,
                  )}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button size="sm" variant="action" onClick={() => handleCopy(t)}>
                  <Copy /> Copiar resposta
                </Button>
                {hasFields && (
                  <Button size="sm" variant="outline" onClick={() => { actions.addRecent(t.id); setActive(t); }}>
                    <PencilLine /> Editar campos
                  </Button>
                )}
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
      <FillDialog template={active} onClose={() => setActive(null)} />
    </>
  );
}
