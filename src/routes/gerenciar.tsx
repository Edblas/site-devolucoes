import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Download, Upload, RotateCcw, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CategoryIcon, ICONS } from "@/components/icons";
import { actions, extractFields, fieldLabel, isValidModels, useStore, type Template } from "@/lib/store";

export const Route = createFileRoute("/gerenciar")({
  validateSearch: z.object({ categoria: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Gerenciar modelos — Central de Devoluções" },
      { name: "description", content: "Crie, edite, importe e exporte modelos de respostas padronizadas." },
      { property: "og:title", content: "Gerenciar modelos — Central de Devoluções" },
      { property: "og:description", content: "Crie, edite, importe e exporte modelos de respostas padronizadas." },
    ],
  }),
  component: Manage,
});

function Confirm({ trigger, title, desc, onConfirm }: { trigger: React.ReactNode; title: string; desc: string; onConfirm: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Manage() {
  const { categoria } = Route.useSearch();
  const { categories, templates } = useStore();
  const [selected, setSelected] = useState(categoria && categories.some((c) => c.id === categoria) ? categoria : categories[0]?.id ?? "");
  const [editing, setEditing] = useState<Partial<Template> | null>(categoria ? { categoryId: categoria, title: "", text: "" } : null);
  const [newCat, setNewCat] = useState("");
  const [renaming, setRenaming] = useState<{ id: string; name: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const cat = categories.find((c) => c.id === selected);
  const list = templates.filter((t) => t.categoryId === selected);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(actions.exportModels(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `central-devolucoes-modelos-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success("Modelos exportados.");
  };

  const importJson = async (file: File) => {
    try {
      const data = JSON.parse(await file.text());
      if (!isValidModels(data)) throw new Error();
      actions.importModels(data);
      setSelected(data.categories[0]?.id ?? "");
      setEditing(null);
      toast.success(`Importados ${data.categories.length} processos e ${data.templates.length} respostas.`);
    } catch {
      toast.error("Arquivo inválido. Use um JSON exportado pela Central de Devoluções.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Gerenciar modelos</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={exportJson}><Download /> Exportar JSON</Button>
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}><Upload /> Importar JSON</Button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) importJson(f); e.target.value = ""; }} />
          <Confirm
            trigger={<Button variant="outline" size="sm"><RotateCcw /> Restaurar modelos iniciais</Button>}
            title="Restaurar modelos iniciais?"
            desc="Todos os processos e respostas voltarão ao conteúdo original. Alterações feitas serão perdidas. Exporte antes se quiser guardá-las."
            onConfirm={() => { actions.restoreDefaults(); setSelected("pessoa-pj"); setEditing(null); toast.success("Modelos iniciais restaurados."); }}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <aside className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Tipos de processo</h2>
          <ul className="space-y-1">
            {categories.map((c) => (
              <li key={c.id}>
                {renaming?.id === c.id ? (
                  <form
                    className="flex gap-1"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!renaming.name.trim()) { toast.error("Informe um nome."); return; }
                      actions.updateCategory(c.id, { name: renaming.name.trim() });
                      setRenaming(null);
                      toast.success("Processo renomeado.");
                    }}
                  >
                    <Input autoFocus value={renaming.name} onChange={(e) => setRenaming({ ...renaming, name: e.target.value })} className="h-9 bg-card" />
                    <Button size="icon" type="submit" aria-label="Salvar"><Check /></Button>
                    <Button size="icon" type="button" variant="ghost" aria-label="Cancelar" onClick={() => setRenaming(null)}><X /></Button>
                  </form>
                ) : (
                  <button
                    onClick={() => { setSelected(c.id); setEditing(null); }}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${selected === c.id ? "bg-navy text-navy-foreground" : "hover:bg-accent"}`}
                  >
                    <CategoryIcon name={c.icon} className="h-4 w-4 shrink-0" />
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-xs opacity-70">{templates.filter((t) => t.categoryId === c.id).length}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!newCat.trim()) { toast.error("Informe o nome do novo processo."); return; }
              actions.addCategory(newCat.trim());
              setNewCat("");
              toast.success("Processo criado.");
            }}
          >
            <Input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Novo tipo de processo" className="bg-card" />
            <Button type="submit" size="icon" aria-label="Criar processo"><Plus /></Button>
          </form>
        </aside>

        <section className="space-y-4">
          {cat ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">{cat.name}</h2>
                  <select value={cat.icon} onChange={(e) => actions.updateCategory(cat.id, { icon: e.target.value })} className="h-8 rounded-md border border-input bg-card px-2 text-xs" aria-label="Ícone">
                    {Object.keys(ICONS).map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setRenaming({ id: cat.id, name: cat.name })}><Pencil /> Renomear</Button>
                  <Confirm
                    trigger={<Button size="sm" variant="outline" className="text-destructive"><Trash2 /> Excluir</Button>}
                    title={`Excluir "${cat.name}"?`}
                    desc={`O processo e suas ${list.length} resposta(s) serão excluídos.`}
                    onConfirm={() => { actions.deleteCategory(cat.id); setSelected(categories.find((c) => c.id !== cat.id)?.id ?? ""); toast.success("Processo excluído."); }}
                  />
                  <Button size="sm" variant="action" onClick={() => setEditing({ categoryId: cat.id, title: "", text: "" })}><Plus /> Nova resposta</Button>
                </div>
              </div>

              {editing && <Editor key={editing.id ?? "new"} initial={editing} onDone={() => setEditing(null)} />}

              <ul className="space-y-2">
                {list.map((t) => (
                  <li key={t.id} className="flex items-start gap-3 rounded-lg border bg-card p-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{t.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.text}</p>
                    </div>
                    <Button size="icon" variant="ghost" aria-label="Editar" onClick={() => setEditing(t)}><Pencil /></Button>
                    <Confirm
                      trigger={<Button size="icon" variant="ghost" aria-label="Excluir" className="text-destructive"><Trash2 /></Button>}
                      title="Excluir resposta?"
                      desc={`"${t.title}" será excluída permanentemente.`}
                      onConfirm={() => { actions.deleteTemplate(t.id); toast.success("Resposta excluída."); }}
                    />
                  </li>
                ))}
                {!list.length && !editing && <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">Nenhuma resposta cadastrada.</p>}
              </ul>
            </>
          ) : (
            <p className="text-muted-foreground">Crie um tipo de processo para começar.</p>
          )}
        </section>
      </div>
    </div>
  );
}

function Editor({ initial, onDone }: { initial: Partial<Template>; onDone: () => void }) {
  const { categories } = useStore();
  const [title, setTitle] = useState(initial.title ?? "");
  const [text, setText] = useState(initial.text ?? "");
  const [categoryId, setCategoryId] = useState(initial.categoryId ?? categories[0]?.id ?? "");
  const [newField, setNewField] = useState("");
  const [err, setErr] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fields = extractFields(text);

  const insertField = () => {
    const name = newField.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    if (!name) { toast.error("Informe o nome do campo."); return; }
    const tag = `{{${name}}}`;
    const el = textRef.current;
    const pos = el?.selectionStart ?? text.length;
    setText(text.slice(0, pos) + tag + text.slice(el?.selectionEnd ?? pos));
    setNewField("");
  };

  const save = () => {
    if (!title.trim() || !text.trim() || !categoryId) {
      setErr(true);
      { toast.error("Preencha o título e o texto da resposta."); return; }
    }
    actions.saveTemplate({ id: initial.id, categoryId, title: title.trim(), text: text.trim() });
    toast.success(initial.id ? "Resposta atualizada." : "Resposta criada.");
    onDone();
  };

  return (
    <div className="space-y-4 rounded-lg border-2 border-primary/40 bg-card p-4 shadow-soft">
      <h3 className="font-semibold">{initial.id ? "Editar resposta" : "Nova resposta"}</h3>
      <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
        <div className="space-y-1.5">
          <Label htmlFor="t-title">Título do motivo *</Label>
          <Input id="t-title" value={title} onChange={(e) => setTitle(e.target.value)} aria-invalid={err && !title.trim()} className={err && !title.trim() ? "border-destructive" : ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="t-cat">Tipo de processo</Label>
          <select id="t-cat" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm">
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="t-text">Texto padronizado *</Label>
        <Textarea id="t-text" ref={textRef} rows={4} value={text} onChange={(e) => setText(e.target.value)} className={err && !text.trim() ? "border-destructive" : ""} />
        <p className="text-xs text-muted-foreground">Campos variáveis usam o formato {"{{nome_do_campo}}"}. Eles serão solicitados antes da cópia.</p>
      </div>
      <div className="flex flex-wrap items-end gap-2">
        <div className="space-y-1.5">
          <Label htmlFor="t-field">Inserir campo variável</Label>
          <Input id="t-field" value={newField} onChange={(e) => setNewField(e.target.value)} placeholder="ex.: data correta" className="w-56" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); insertField(); } }} />
        </div>
        <Button type="button" variant="outline" onClick={insertField}><Plus /> Inserir</Button>
      </div>
      {fields.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-muted-foreground">Campos detectados:</span>
          {fields.map((f) => <span key={f} className="rounded bg-accent px-2 py-0.5 text-accent-foreground">{fieldLabel(f)}</span>)}
        </div>
      )}
      <div className="flex gap-2">
        <Button variant="action" onClick={save}><Check /> Salvar</Button>
        <Button variant="ghost" onClick={onDone}>Cancelar</Button>
      </div>
    </div>
  );
}
