import { describe, expect, it } from "vitest";
import { extractFields, fillTemplate, seedModels } from "./store";

describe("modelos", () => {
  it("cadastra 13 tipos de processo, com 22 respostas de Pessoa PJ", () => {
    const m = seedModels();
    expect(m.categories).toHaveLength(13);
    expect(m.categories[0]?.name).toBe("Pessoa PJ");
    expect(m.templates.filter((t) => t.categoryId === "pessoa-pj")).toHaveLength(22);
  });
  it("detecta e preenche campos variáveis", () => {
    const text = "Capital social: correção para {{capital_correto}}.";
    expect(extractFields(text)).toEqual(["capital_correto"]);
    expect(fillTemplate(text, { capital_correto: "100" })).toBe("Capital social: correção para 100.");
  });
});
