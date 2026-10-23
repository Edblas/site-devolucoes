import { describe, expect, it } from "vitest";
import { displayText, seedModels } from "./store";

describe("modelos", () => {
  it("cadastra as categorias e as contagens por categoria", () => {
    const m = seedModels();
    expect(m.categories).toHaveLength(14);
    expect(m.categories.map((c) => c.name)).toEqual([
      "Pessoa PJ",
      "Pessoa PF",
      "Renda PJ",
      "Renda PF",
      "Renda AGRO",
      "IRPF",
      "Bem-Novo",
      "Relacionamento PJ",
      "Relacionamento PF",
      "Produtor",
      "Endereço",
      "Certidão",
      "Tributação",
      "Devoluções Padrão",
    ]);
    expect(m.templates.filter((t) => t.categoryId === "pessoa-pj")).toHaveLength(22);
    expect(m.templates.filter((t) => t.categoryId === "pessoa-pf")).toHaveLength(20);
    expect(m.templates.filter((t) => t.categoryId === "renda-pj")).toHaveLength(23);
    expect(m.templates.filter((t) => t.categoryId === "renda-pf")).toHaveLength(19);
    expect(m.templates.filter((t) => t.categoryId === "renda-agro")).toHaveLength(17);
    expect(m.templates.filter((t) => t.categoryId === "irpf")).toHaveLength(11);
    expect(m.templates.filter((t) => t.categoryId === "bem-novo")).toHaveLength(40);
    expect(m.templates.filter((t) => t.categoryId === "relacionamento-pj")).toHaveLength(19);
    expect(m.templates.filter((t) => t.categoryId === "relacionamento-pf")).toHaveLength(10);
    expect(m.templates.filter((t) => t.categoryId === "produtor")).toHaveLength(15);
    expect(m.templates.filter((t) => t.categoryId === "endereco")).toHaveLength(15);
    expect(m.templates.filter((t) => t.categoryId === "certidao")).toHaveLength(8);
    expect(m.templates.filter((t) => t.categoryId === "tributacao")).toHaveLength(4);
    expect(m.templates.filter((t) => t.categoryId === "devolucoes-padrao")).toHaveLength(5);
  });
  it("mostra os campos entre parênteses", () => {
    expect(displayText("Capital social: correção para {{capital_correto}}.")).toBe("Capital social: correção para (capital_correto).");
  });
});
