const PJ = "pessoa-pj";
const DOC = "conforme consta no documento anexado.";

export const SEED_CATEGORIES = [
  { id: PJ, name: "Pessoa PJ", icon: "building" },
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `processo-${i + 2}`,
    name: `Processo ${i + 2}`,
    icon: "folder",
  })),
];

const raw: [string, string][] = [
  ["Aprovação sem validação — Documentos vigentes", 'Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Chaves incorretas", "Chaves incorretas: Solicitamos ajuste {{detalhamento_ajuste}}."],
  ["Falta de documento comprobatório", "Falta de documento comprobatório: Solicitamos o envio de {{documento_solicitado}}."],
  ["Aprovação sem validação — Indisponibilidade de acesso gratuito", "Aprovado sem validação: Consulta não realizada devido à indisponibilidade de acesso gratuito no estado."],
  ["Aprovação sem validação — Restrição de acesso", "Aprovado sem validação: Consulta não realizada devido à restrição de acesso ou indisponibilidade."],
  ["Data de constituição", `Data de constituição: Solicitamos a correção da data de constituição para {{data_correta}}, ${DOC}`],
  ["Número de registro no órgão competente", `Número de registro no órgão competente: Solicitamos a correção do número de registro no órgão competente para {{numero_correto}}, ${DOC}`],
  ["Data de registro no órgão competente", `Data de registro no órgão competente: Solicitamos a correção da data de registro no órgão competente para {{data_correta}}, ${DOC}`],
  ["Número da última alteração do contrato social", `Número da última alteração do contrato social: Solicitamos a correção do número da última alteração do contrato social para {{numero_correto}}, ${DOC}`],
  ["Data da última alteração do contrato social", `Data da última alteração do contrato social: Solicitamos a correção da data da última alteração do contrato social para {{data_correta}}, ${DOC}`],
  ["Número de registro de representação", `Número de registro de representação: Solicitamos a correção do número de registro de representação para {{numero_correto}}, ${DOC}`],
  ["Data de registro de representação", `Data de registro de representação: Solicitamos a correção da data de representação para {{data_correta}}, ${DOC}`],
  ["Opção MEI", `Opção MEI: Solicitamos a correção da Opção MEI para {{informacao_correta}}, ${DOC}`],
  ["Número do contrato social", `Número do contrato social: Solicitamos a correção do número do contrato social para {{numero_correto}}, ${DOC}`],
  ["Capital social", `Capital social: Solicitamos a correção do capital social para {{capital_correto}}, ${DOC}`],
  ["Inscrição Estadual", `Inscrição Estadual: Solicitamos a correção do número da Inscrição Estadual para {{inscricao_correta}}, ${DOC}`],
  ["Inscrição Municipal", `Inscrição Municipal: Solicitamos a correção do número da Inscrição Municipal para {{inscricao_correta}}, ${DOC}`],
  ["Documento inválido", "Documento inválido: O documento anexado se refere a {{descricao_documento}}. Solicitamos o ajuste da documentação anexada."],
  ["Ficha cadastral", "Ficha cadastral: Solicitamos ajustes no documento da ficha cadastral, pois {{motivo_ajuste}}."],
  ["Ficha PEP", "Ficha PEP: Solicitamos ajuste no documento da ficha PEP, pois {{motivo_ajuste}}."],
];

export const SEED_TEMPLATES = raw.map(([title, text], i) => ({
  id: `pj-${String(i + 1).padStart(2, "0")}`,
  categoryId: PJ,
  title,
  text,
}));
