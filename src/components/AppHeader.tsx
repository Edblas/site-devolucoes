import { Link } from "@tanstack/react-router";
import { FileStack, Settings2 } from "lucide-react";

export function AppHeader() {
  return (
    <header className="bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-navy-foreground/10">
            <FileStack className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-lg font-semibold leading-tight">Central de Devoluções</span>
            <span className="block text-xs text-navy-foreground/70">Respostas padronizadas para processos operacionais</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link to="/" className="rounded-md px-3 py-2 hover:bg-navy-foreground/10" activeOptions={{ exact: true }} activeProps={{ className: "bg-navy-foreground/15" }}>
            Início
          </Link>
          <Link to="/gerenciar" className="flex items-center gap-1.5 rounded-md px-3 py-2 hover:bg-navy-foreground/10" activeProps={{ className: "bg-navy-foreground/15" }}>
            <Settings2 className="h-4 w-4" /> <span className="hidden sm:inline">Gerenciar modelos</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
