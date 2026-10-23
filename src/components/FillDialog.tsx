import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Eraser, ArrowLeft, Wand2 } from "lucide-react";
import { extractFields, fieldLabel, fillTemplate, type Template } from "@/lib/store";
import { copyText } from "@/lib/clipboard";

export function FillDialog({ template, onClose }: { template: Template | null; onClose: () => void }) {
  const fields = useMemo(() => (template ? extractFields(template.text) : []), [template]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setValues({});
    setOutput("");
    setShowErrors(false);
  }, [template]);

  const missing = fields.filter((f) => !values[f]?.trim());
  const complete = missing.length === 0;

  useEffect(() => {
    if (template && complete) setOutput(fillTemplate(template.text, Object.fromEntries(fields.map((f) => [f, values[f].trim()]))));
    else setOutput("");
  }, [values, template, complete, fields]);

  const generate = () => {
    if (!complete) setShowErrors(true);
  };

  const copy = async () => {
    if (!complete) {
      setShowErrors(true);
      return;
    }
    if (!output.trim()) return;
    await copyText(output);
  };

  return (
    <Dialog open={!!template} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{template?.title}</DialogTitle>
          <DialogDescription>Preencha os campos para gerar a resposta.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (complete) copy();
            else generate();
          }}
        >
          {fields.map((f, i) => {
            const err = showErrors && !values[f]?.trim();
            return (
              <div key={f} className="space-y-1.5">
                <Label htmlFor={`f-${f}`}>{fieldLabel(f)} *</Label>
                <Input
                  id={`f-${f}`}
                  autoFocus={i === 0}
                  value={values[f] ?? ""}
                  aria-invalid={err}
                  className={err ? "border-destructive focus-visible:ring-destructive" : ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
                />
                {err && <p className="text-xs text-destructive">Campo obrigatório.</p>}
              </div>
            );
          })}
          {!complete && (
            <Button type="submit" variant="action" className="w-full">
              <Wand2 /> Gerar resposta
            </Button>
          )}
          {complete && (
            <div className="space-y-1.5">
              <Label htmlFor="out">Resposta final (editável)</Label>
              <Textarea id="out" rows={5} value={output} onChange={(e) => setOutput(e.target.value)} />
            </div>
          )}
          <div className="flex flex-wrap gap-2 pt-1">
            <Button type="button" variant="action" onClick={copy} disabled={!complete}>
              <Copy /> Copiar resposta
            </Button>
            <Button type="button" variant="outline" onClick={() => { setValues({}); setShowErrors(false); }}>
              <Eraser /> Limpar campos
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              <ArrowLeft /> Voltar às respostas
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
