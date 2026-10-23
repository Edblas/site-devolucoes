import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TemplateList } from "@/components/TemplateList";
import { CategoryIcon } from "@/components/icons";
import { actions, normalize, useStore, type Template } from "@/lib/store";

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
  const { categories, templates, isAdmin } = useStore();
  const cat = categories.find((c) => c.id === id);
  const [sort, setSort] = useState<"orig" | "az" | "za">("orig");
  const [q, setQ] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");

  const list = useMemo(() => {
    const n = normalize(q.trim());
    const l = templates.filter((t) => t.categoryId === id && (!n || normalize(`${t.title} ${t.text}`).includes(n)));
    if (sort === "az") l.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    if (sort === "za") l.sort((a, b) => b.title.localeCompare(a.title, "pt-BR"));
    return l;
  }, [templates, id, sort, q]);

  useEffect(() => {
    setCategoryName(cat?.name ?? "");
  }, [cat?.name]);

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
        <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-9 rounded-md border border-input bg-card px-3 text-sm" aria-label="Ordenação">
          <option value="orig">Ordem cadastrada</option>
          <option value="az">Alfabética (A–Z)</option>
          <option value="za">Alfabética (Z–A)</option>
        </select>
      </div>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filtrar respostas deste processo..." className="bg-card pl-9" />
      </div>
      {isAdmin ? (
        <>
          <section className="space-y-4 rounded-lg border bg-card p-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Modo ADM</h2>
              <p className="text-sm text-muted-foreground">Aqui você pode renomear o processo e gerenciar as devoluções desta categoria.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do processo</label>
                <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Nome do processo" />
              </div>
              <Button
                variant="action"
                onClick={() => actions.renameCategory(id, categoryName)}
                disabled={!categoryName.trim() || categoryName.trim() === cat.name}
              >
                Salvar nome
              </Button>
            </div>
            <div className="space-y-3 border-t pt-4">
              <h3 className="font-medium">Adicionar devolução</h3>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Título da devolução" />
              <Textarea value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Texto da devolução" className="min-h-32" />
              <div className="flex justify-end">
                <Button
                  variant="action"
                  disabled={!newTitle.trim() || !newText.trim()}
                  onClick={() => {
                    actions.addTemplate(id, newTitle, newText);
                    setNewTitle("");
                    setNewText("");
                  }}
                >
                  Adicionar devolução
                </Button>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Editar devoluções</h2>
            {list.length ? (
              <div className="space-y-3">
                {list.map((template) => <AdminTemplateEditor key={template.id} template={template} />)}
              </div>
            ) : (
              <p className="rounded-lg border border-dashed bg-card p-6 text-center text-sm text-muted-foreground">
                Nenhuma resposta cadastrada neste processo.
              </p>
            )}
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Visualização</h2>
            <TemplateList templates={list} empty="Nenhuma resposta cadastrada neste processo." />
          </section>
        </>
      ) : (
        <TemplateList templates={list} empty="Nenhuma resposta cadastrada neste processo." />
      )}
    </div>
  );
}

function AdminTemplateEditor({ template }: { template: Template }) {
  const [title, setTitle] = useState(template.title);
  const [text, setText] = useState(template.text);

  useEffect(() => {
    setTitle(template.title);
    setText(template.text);
  }, [template.id, template.title, template.text]);

  const changed = title.trim() !== template.title || text.trim() !== template.text;

  return (
    <article className="space-y-3 rounded-lg border bg-card p-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título da devolução" />
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Texto da devolução" className="min-h-32" />
      <div className="flex flex-wrap justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setTitle(template.title);
            setText(template.text);
          }}
          disabled={!changed}
        >
          Descartar
        </Button>
        <Button variant="destructive" onClick={() => actions.deleteTemplate(template.id)}>
          Excluir
        </Button>
        <Button
          variant="action"
          onClick={() => actions.updateTemplate(template.id, title, text)}
          disabled={!title.trim() || !text.trim() || !changed}
        >
          Salvar
        </Button>
      </div>
    </article>
  );
}
