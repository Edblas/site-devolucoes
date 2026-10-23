import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "cd.notice.v1";
const VISIBLE_MS = 3000;

function today() {
  return new Date().toLocaleDateString("pt-BR");
}

export function DailyNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(KEY) === today()) return;
      localStorage.setItem(KEY, today());
    } catch {
      /* storage blocked */
    }
    setOpen(true);
    const timer = window.setTimeout(() => setOpen(false), VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4">
      <div role="alertdialog" aria-live="assertive" className="max-w-lg rounded-lg border bg-card p-6">
        <h2 className="text-base font-semibold text-foreground">⚠️ Atenção ao preencher a justificativa</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>Preencha a justificativa de forma detalhada e clara, descrevendo, quando necessário, o que precisa ser corrigido e como deve ser feito.</li>
          <li>Quanto mais completa for a justificativa, menor a chance de ocorrer uma nova devolução pelo mesmo motivo.</li>
          <li>Caso tenha alguma dúvida ou sinta necessidade de validar o apontamento, encaminhe a justificativa para a liderança, Qualidade ou ponto focal do time antes de finalizar.</li>
        </ul>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
