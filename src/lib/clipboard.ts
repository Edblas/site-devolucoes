import { toast } from "sonner";

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      if (!ok) throw new Error("copy failed");
    }
    toast.success("Resposta copiada com sucesso!");
    return true;
  } catch {
    toast.error("Não foi possível copiar. Selecione o texto e use Ctrl+C.");
    return false;
  }
}
