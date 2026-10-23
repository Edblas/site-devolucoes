import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FileStack, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { actions, useStore } from "@/lib/store";

export function AppHeader() {
  const { isAdmin } = useStore();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const ok = actions.loginAdmin(password);
    if (!ok) {
      setError("Senha incorreta.");
      return;
    }
    setPassword("");
    setError("");
    setOpen(false);
  };

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
        {isAdmin ? (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-navy-foreground/10 px-3 py-1 text-xs font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              ADM
            </span>
            <Button
              size="sm"
              variant="outline"
              className="border-navy-foreground/20 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
              onClick={() => actions.logoutAdmin()}
            >
              Sair
            </Button>
          </div>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border-navy-foreground/20 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
              >
                ADM
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Acesso ADM</DialogTitle>
                <DialogDescription>Digite a senha padrão para liberar edição e estatísticas.</DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                  placeholder="Senha do administrador"
                />
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button variant="action" onClick={handleLogin}>Entrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  );
}
