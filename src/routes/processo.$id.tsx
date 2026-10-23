import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowDownAZ, ArrowUpZA, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TemplateList } from "@/components/TemplateList";
import { CategoryIcon } from "@/components/icons";
import { normalize, useStore } from "@/lib/store";

export const Route = createFileRoute("/processo/$id")({
  head: () => ({
    meta: [
      { title: "Respostas do processo — Central de Devoluções" },
      { name: "description", content: "Respostas padronizadas de devolução para este tipo de processo." },
      { property: "og:title", content: "Respostas do processo — Central de Devoluções" },
      { property: "og:description", content: "Respostas padronizadas de devolução para este tipo de processo." },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  const { id } = Route.useParams();
  const { categories, templates } = useStore();
  const cat = categories.find((c) => c.id === id);
  const [sort, setSort] = useState<"orig" | "az" | "za">("orig");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const n = normalize(q.trim());
    const l = templates.filter((t) => t.categoryId === id && (!n || normalize(`${t.title} ${t.text}`).includes(n)));
    if (sort === "az") l.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    if (sort === "za") l.sort((a, b) => b.title.localeCompare(a.title, "pt-BR"));
    return l;
  }, [templates, id, sort, q]);

  if (!cat)
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">Tipo de processo não encontrado.</p>
        <Link to="/" className="mt-4 inline-block text-primary underline">Voltar ao início</Link>
      </div>
    );

  return (
    <div className="space-y-5">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Todos os processos
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-3 text-2xl font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-navy text-navy-foreground"><CategoryIcon name={cat.icon} className="h-5 w-5" /></span>
          {cat.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-9 rounded-md border border-input bg-card px-3 text-sm" aria-label="Ordenação">
            <option value="orig">Ordem cadastrada</option>
            <option value="az">Alfabética (A–Z)</option>
            <option value="za">Alfabética (Z–A)</option>
          </select>
          <Button asChild variant="outline" size="sm">
            <Link to="/gerenciar" search={{ categoria: id }}><Plus /> Nova resposta</Link>
          </Button>
        </div>
      </div>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filtrar respostas deste processo..." className="bg-card pl-9" />
      </div>
      <TemplateList templates={list} empty="Nenhuma resposta cadastrada neste processo. Use “Nova resposta” para adicionar." />
      <span className="sr-only">{sort === "az" ? <ArrowDownAZ /> : <ArrowUpZA />}</span>
    </div>
  );
}
