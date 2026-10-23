import { useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CategoryIcon } from "@/components/icons";
import { useStore } from "@/lib/store";

function formatMonth(monthKey: string) {
  const [year, month] = monthKey.split("-");
  return `${month}/${year}`;
}

export function StatsDialog() {
  const { categories, templates, usage, usageByMonth } = useStore();
  const [period, setPeriod] = useState("total");

  const monthOptions = useMemo(
    () => Object.keys(usageByMonth).sort((a, b) => b.localeCompare(a)),
    [usageByMonth],
  );

  const activeUsage = period === "total" ? usage : (usageByMonth[period] ?? {});

  const clicksFor = (categoryId: string) =>
    templates.filter((t) => t.categoryId === categoryId).reduce((sum, t) => sum + (activeUsage[t.id] ?? 0), 0);
  const total = templates.reduce((sum, t) => sum + (activeUsage[t.id] ?? 0), 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BarChart3 /> Estatísticas
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Estatísticas de uso</DialogTitle>
          <DialogDescription>Quantidade de cliques por tipo de processo.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <label htmlFor="stats-period" className="text-sm font-medium">
            Período
          </label>
          <select
            id="stats-period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm"
            aria-label="Selecionar período das estatísticas"
          >
            <option value="total">Total geral</option>
            {monthOptions.map((monthKey) => (
              <option key={monthKey} value={monthKey}>
                {formatMonth(monthKey)}
              </option>
            ))}
          </select>
        </div>
        <ul className="divide-y">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center gap-3 py-2">
              <CategoryIcon name={c.icon} className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate text-sm">{c.name}</span>
              <span className="text-sm font-medium tabular-nums">{clicksFor(c.id)}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t pt-3 text-sm font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{total}</span>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
