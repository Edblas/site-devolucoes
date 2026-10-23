const PJ = "pessoa-pj";
const PF = "pessoa-pf";
const RENDA = "renda-pj";
const RENDA_PF = "renda-pf";
const AGRO = "renda-agro";
const IRPF = "irpf";
const BEM = "bem-novo";
const REL = "relacionamento-pj";
const REL_PF = "relacionamento-pf";
const PROD = "produtor";
const END = "endereco";
const CERT = "certidao";
const TRIB = "tributacao";
const PADRAO = "devolucoes-padrao";
const DOC = "conforme consta no documento anexado.";

export const SEED_CATEGORIES = [
  { id: PJ, name: "Pessoa PJ", icon: "building" },
  { id: PF, name: "Pessoa PF", icon: "user" },
  { id: RENDA, name: "Renda PJ", icon: "wallet" },
  { id: RENDA_PF, name: "Renda PF", icon: "card" },
  { id: AGRO, name: "Renda AGRO", icon: "home" },
  { id: IRPF, name: "IRPF", icon: "file" },
  { id: BEM, name: "Bem-Novo", icon: "car" },
  { id: REL, name: "Relacionamento PJ", icon: "users" },
  { id: REL_PF, name: "Relacionamento PF", icon: "briefcase" },
  { id: PROD, name: "Produtor", icon: "shield" },
  { id: END, name: "Endereço", icon: "bank" },
  { id: CERT, name: "Certidão", icon: "list" },
  { id: TRIB, name: "Tributação", icon: "folder" },
  { id: PADRAO, name: "Devoluções Padrão", icon: "file" },
];

const pjRaw: [string, string][] = [
  ["Aprovação sem validação — Documentos vigentes", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
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

const pfRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Chaves incorretas", "Chaves incorretas: Solicitamos ajuste na chave documental, pois {{motivo_ajuste}}."],
  ["Cadastro divergente do comprovante em anexo", "Cadastro divergente do comprovante em anexo: Solicitamos ajuste nos campos {{campos_divergentes}}, pois não foram atualizados de acordo."],
  ["Nome de tratamento", "Nome de tratamento: Identificamos a necessidade de confirmação do nome de tratamento informado. Favor verificar se o preenchimento está correto e, caso necessário, realizar a correção."],
  ["Assinaturas", "Assinaturas: Solicitamos o ajuste das assinaturas, pois {{motivo_ajuste}}."],
  ["Falta de documento comprobatório", "Falta de documento comprobatório: Solicitamos o envio de {{documento_solicitado}}."],
  ["Tipo de documento", "Tipo de documento: Solicitamos a correção do tipo do documento para {{tipo_correto}}."],
  ["Órgão expedidor", "Órgão expedidor: Solicitamos a correção do órgão expedidor para {{orgao_expedidor_correto}}."],
  ["UF do órgão expedidor", "UF do órgão expedidor: Solicitamos a correção da UF do órgão expedidor para {{uf_correta}}."],
  ["Naturalidade", "Naturalidade: Solicitamos a correção da naturalidade para {{naturalidade_correta}}, conforme documento anexado."],
  ["Número do documento", "Número do documento: Solicitamos a correção do número do documento para {{numero_correto}}."],
  ["Data de emissão", "Data de emissão: Solicitamos a correção da data de emissão para {{data_correta}}."],
  ["Ficha cadastral", "Ficha cadastral: Solicitamos ajuste no documento da ficha cadastral, pois {{motivo_ajuste}}."],
  ["Ficha PEP", "Ficha PEP: Solicitamos ajuste no documento da ficha PEP, pois {{motivo_ajuste}}."],
  ["Filiação", "Filiação: Solicitamos ajuste na filiação, pois {{motivo_ajuste}}."],
  ["Estado civil", "Estado civil: Solicitamos ajuste no estado civil, pois {{motivo_ajuste}}."],
  ["Documentação", "Documentação: Foram identificadas inconsistências no documento apresentado, o que impossibilita a conclusão da validação. Favor anexar documento válido."],
  ["Data de nascimento", "Data de nascimento: DATA DE NASCIMENTO ESTÁ INCORRETA, SEGUE PASSO A PASSO: Página inicial Atendimento à Cooperativa CAPES (Cadastro de Pessoas) Informações Cadastrais Alteração de Data de Nascimento, Estado Civil e Nome – CAPES."],
];

const rendaRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Chaves incorretas", "Chaves incorretas: Solicitamos ajuste na chave de documentação para {{chave_correta}}."],
  ["Assinatura digital validada pela cooperativa", "Assinatura digital validada pela cooperativa: Foi anexado a validação da assinatura."],
  ["Assinaturas", "Assinaturas: Solicitamos o ajuste das assinaturas, pois {{motivo_ajuste}}."],
  ["Documento inválido — Captura de tela/print", "Documento inválido: O documento anexado se refere a uma CAPTURA DE TELA/PRINT. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Ilegível", "Documento inválido: O documento anexado se refere a um DOCUMENTO ILEGÍVEL. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Informar motivo", "Documento inválido: O documento anexado se refere a um DOCUMENTO INVÁLIDO, pois {{motivo_invalidade}}. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Cortado/rasurado", "Documento inválido: O documento anexado se refere a um DOCUMENTO CORTADO/RASURADO. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Incompleto", "Documento inválido: O documento anexado se refere a um DOCUMENTO INCOMPLETO, pois {{motivo_incompleto}}. Solicitamos o ajuste da documentação anexada."],
  ["Consulta de opção do Simples", 'Consulta de opção do Simples: Anexar consulta, pois a empresa possui porte "{{porte}}".'],
  ["Campo de optante do Simples", 'Campo de optante do Simples: Solicitamos que seja ajustada a opção pelo simples para "{{opcao}}".'],
  ["Tipo de renda", "Tipo de renda: Solicitamos a correção do tipo de renda para {{tipo_renda_correto}}."],
  ["Comprovante do Simples Nacional — Recibo de entrega", "Comprovante do Simples Nacional: Solicitamos que seja anexado o recibo de entrega na apuração do PGDAS-D, juntamente com o referido documento."],
  ["Comprovante do Simples Nacional — PGDAS-D", "Comprovante do Simples Nacional: Solicitamos que seja anexado o PGDAS-D, juntamente com o recibo de apuração."],
  ["Cálculo do Simples — Mais de 12 meses", "Cálculo do Simples: Solicitamos a correção da renda mensal para R${{valor_rbt12_12}} RBT12/12 ou R${{valor_rbt12_rpa}} RBT12 + RPA de apuração - PA do ano anterior dividido por 12."],
  ["Cálculo do Simples — Menos de 12 meses", "Cálculo do Simples: Solicitamos a correção da renda mensal para R${{valor_rbt12_meses}} RBT12/MESES FATURADOS ou R${{valor_rbt12_rpa_meses}} RBT12 + RPA de apuração dividido pelos meses faturados +1."],
  ["Renda inválida", "Renda inválida: Solicitamos a correção da renda mensal para R${{valor_renda}}, conforme documento anexado."],
  ["Prazo de validade", "Prazo de validade: O documento anexado está fora do prazo de validade. Solicitamos que seja enviado um documento atualizado."],
  ["Falta de informação comprobatória", "Falta de informação comprobatória: Solicitamos a informação {{informacao_faltante}}."],
  ["Descrição divergente", "Descrição divergente: Solicitamos a correção da descrição do fluxo para {{descricao_correta}}, conforme documento anexado."],
  ["Documento inválido — Documentos oficiais do Simples", "Documento inválido: Solicitamos que sejam anexados os documentos oficiais do Simples Nacional (extrato do Simples Nacional ou o Declaratório, juntamente com o recibo de entrega do PGDAS-D)."],
];

const rendaPfRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Assinatura digital validada pela cooperativa", "Assinatura digital validada pela cooperativa: Foi anexado a validação da assinatura."],
  ["Falta de documento comprobatório", "Falta de documento comprobatório: Solicitamos o envio de {{documento_solicitado}}."],
  ["Vínculo não encontrado", "Vínculo não encontrado: Não foi possível encontrar vínculo entre o associado e o terceiro informado no comprovante em anexo. Solicitamos que seja anexado um comprovante em nome do associado ou a comprovação do vínculo."],
  ["Assinaturas", "Assinaturas: Solicitamos o ajuste das assinaturas, pois {{motivo_ajuste}}."],
  ["Descrição divergente", "Descrição divergente: Solicitamos o ajuste na descrição informada no fluxo, pois não condiz com os comprovantes."],
  ["Prazo de validade", "Prazo de validade: Solicitamos que seja anexado um comprovante dentro do prazo de validade aceito."],
  ["Tipo de renda", "Tipo de renda: Solicitamos a correção do tipo de renda para {{tipo_renda_correto}}."],
  ["Falta de informação comprobatória", "Falta de informação comprobatória: Solicitamos a informação {{informacao_faltante}}."],
  ["Empregador", "Empregador: Solicitamos a correção do campo empregador para {{empregador_correto}}."],
  ["Renda inválida — Ajuste", "Renda inválida: Solicitamos ajuste {{detalhamento_ajuste}}."],
  ["Renda inválida — CNPJ baixado", "Renda inválida: Ao consultar o CNPJ validamos que o mesmo consta como baixado, logo, a renda cadastrada é inválida. Solicitamos que seja cadastrada uma renda mensal válida para aprovação."],
  ["Documento inválido — Captura de tela/print", "Documento inválido: O documento anexado se refere a uma CAPTURA DE TELA/PRINT. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Ilegível", "Documento inválido: O documento anexado se refere a um DOCUMENTO ILEGÍVEL. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Informar motivo", "Documento inválido: O documento anexado se refere a um DOCUMENTO INVÁLIDO, pois {{motivo_invalidade}}. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Cortado/rasurado", "Documento inválido: O documento anexado se refere a um DOCUMENTO CORTADO/RASURADO. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Incompleto", "Documento inválido: O documento anexado se refere a um DOCUMENTO INCOMPLETO, pois {{motivo_incompleto}}. Solicitamos o ajuste da documentação anexada."],
];

const agroRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Assinatura digital validada pela cooperativa", "Assinatura digital validada pela cooperativa: Foi anexado a validação da assinatura."],
  ["Falta de documento comprobatório", "Falta de documento comprobatório: Solicitamos o envio de {{documento_solicitado}}."],
  ["Tipo de renda", "Tipo de renda: Solicitamos a correção do tipo de renda para {{tipo_renda_correto}}."],
  ["Prazo de validade", "Prazo de validade: O documento está fora do prazo. Solicitamos que seja anexado um documento atualizado."],
  ["Descrição divergente", "Descrição divergente: Solicitamos o ajuste na descrição informada no fluxo, pois não condiz com os comprovantes."],
  ["Assinaturas", "Assinaturas: Solicitamos o ajuste para {{detalhamento_ajuste}}."],
  ["Falta de informação comprobatória", "Falta de informação comprobatória: Solicitamos a informação {{informacao_faltante}}."],
  ["Renda inválida — Atividade rural", "Renda inválida: Solicitamos ajuste, pois a renda cadastrada {{motivo_invalidade}}."],
  ["Documento inválido — Captura de tela/print", "Documento inválido: O documento anexado se refere a uma CAPTURA DE TELA/PRINT. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Ilegível", "Documento inválido: O documento anexado se refere a um DOCUMENTO ILEGÍVEL. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Informar motivo", "Documento inválido: O documento anexado se refere a um DOCUMENTO INVÁLIDO, pois {{motivo_invalidade}}. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Cortado/rasurado", "Documento inválido: O documento anexado se refere a um DOCUMENTO CORTADO/RASURADO. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Incompleto", "Documento inválido: O documento anexado se refere a um DOCUMENTO INCOMPLETO, pois {{motivo_incompleto}}. Solicitamos o ajuste da documentação anexada."],
  ["Falta de documento comprobatório — Base de valores", 'Falta de documento comprobatório: Conforme previsto no Manual de Cadastro (Cap. 2, Seção 4, Item 1.8, letra "k"), é necessária a comprovação da memória de cálculo utilizada e dos parâmetros de mercado considerados para a apuração dos valores. Por gentileza, anexar documento que comprove a base de valores utilizada ou, alternativamente, apresentar documento assinado por profissional habilitado (engenheiro/técnico agropecuário).'],
];

const irpfRaw: [string, string][] = [
  ["Documento inválido — Informar motivo", "Documento inválido: O documento anexado se refere a um DOCUMENTO INVÁLIDO, pois {{motivo_invalidade}}. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Cortado/rasurado", "Documento inválido: O documento anexado se refere a um DOCUMENTO CORTADO/RASURADO. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — IR em preenchimento", "Documento inválido: Não aceitamos Imposto de Renda em preenchimento. Solicitamos que seja anexado o IR válido."],
  ["Falta de documento comprobatório — IRPF completo com recibo", "Falta de documento comprobatório: Solicitamos que seja anexado o IMPOSTO DE RENDA COMPLETO JUNTAMENTE DO RECIBO."],
  ["Falta de documento comprobatório — Recibo com declaratório", "Falta de documento comprobatório: Solicitamos que seja anexado o RECIBO do IRPF juntamente do declaratório."],
  ["Prazo de validade — IRPF 2024/2025", "Prazo de validade: O prazo do IRPF de 2024/2025 está encerrado. Solicitamos que seja anexado o IRPF atualizado para o ano 2026/2025."],
  ["Tipo de renda — Correção com item do IRPF", 'Tipo de renda: Solicitamos a correção do tipo de renda para "{{tipo_renda_correto}}", pois a renda apresentada consta no Item {{item_irpf}}.'],
  ["Renda de terceiro", "Renda de terceiro: O documento anexado está em nome de outra pessoa. Solicitamos que seja enviado o comprovante de renda em nome do(a) associado(a)."],
  ["Tipo de renda — Declaração de renda não aceita", 'Tipo de renda: O tipo "declaração de renda" não é aceito para IRPF. Solicitamos a correção referente à renda que desejam cadastrar.'],
  ["Renda inválida — Item 04 (rescisão)", 'Renda inválida: A renda é inválida, pois a empresa consta no item 04 - "Indenizações por rescisão de contrato de trabalho...". Solicitamos que seja anexada uma renda mensal válida.'],
  ["Descrição divergente", "Descrição divergente: Solicitamos o ajuste na descrição informada no fluxo, pois não condiz com os comprovantes."],
];

const bemRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Tipo do bem", "Tipo do bem: Solicitamos a correção do tipo do bem para {{tipo_bem_correto}}."],
  ["Falta de documento comprobatório", "Falta de documento comprobatório: Solicitamos o envio de {{documento_solicitado}}."],
  ["Prazo de validade", "Prazo de validade: Solicitamos que seja anexado um comprovante dentro do prazo de validade aceito."],
  ["Empreendimento não é válido como bem", "Empreendimento não é válido como bem: Empreendimentos só serão aceitos em fluxo de produtividade."],
  ["Benfeitoria", "Benfeitoria: Bem não pode ser cadastrado de forma isolada, somente somado ao imóvel de mesma matrícula/endereço."],
  ["Cadastro de bens em conjunto", "Cadastro de bens em conjunto: Solicitamos que os bens sejam cadastrados separadamente."],
  ["Cadastro de bem em conjunto — Veículo", "Cadastro de bem em conjunto: Veículo cadastrado possui placa/chassi, portanto, deve ser cadastrado separadamente. Somente poderão ser cadastrados em conjunto máquinas/equipamentos que não possuem chassi."],
  ["Percentual de propriedade", "Percentual de propriedade: Solicitamos a correção do percentual de propriedade para {{percentual_correto}}."],
  ["Bem em processo de aquisição", 'Bem em processo de aquisição: Solicitamos a correção do campo "processo de aquisição" para {{processo_aquisicao}}, conforme documento anexado.'],
  ["Descrição divergente", "Descrição divergente: Solicitamos a correção da descrição do bem para {{descricao_correta}}, conforme documento anexado."],
  ["Valor do bem", "Valor do bem: Solicitamos a correção do valor do bem para {{valor_bem}}, conforme laudo de avaliação."],
  ["Valor de avaliação", "Valor de avaliação: Solicitamos a correção do valor de avaliação para {{valor_avaliacao}}, conforme laudo de avaliação."],
  ["Data de avaliação", "Data de avaliação: Solicitamos a correção da data de avaliação para {{data_avaliacao}}, conforme documento anexado."],
  ["Bem não comprovado como patrimônio", "Bem não comprovado como patrimônio: O bem não está comprovado como patrimônio do associado. Solicitamos que seja anexado comprovante de propriedade do bem."],
  ["Assinaturas", "Assinaturas: Solicitamos o ajuste das assinaturas, pois {{motivo_ajuste}}."],
  ["Chaves duplicadas", "Chaves duplicadas: Solicitamos que a documentação seja anexada em uma única chave, garantindo que o cadastro permaneça correto e padronizado."],
  ["Documento inválido — Laudo/certidão para simples consulta", "Documento inválido: O documento anexado se refere a uma {{descricao_documento}}. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Captura de tela/print", "Documento inválido: O documento anexado se refere a uma CAPTURA DE TELA/PRINT. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Ilegível", "Documento inválido: O documento anexado se refere a um DOCUMENTO ILEGÍVEL. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Informar motivo", "Documento inválido: O documento anexado se refere a um DOCUMENTO INVÁLIDO, pois {{motivo_invalidade}}. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Cortado/rasurado", "Documento inválido: O documento anexado se refere a um DOCUMENTO CORTADO/RASURADO. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Incompleto", "Documento inválido: O documento anexado se refere a um DOCUMENTO INCOMPLETO, pois {{motivo_incompleto}}. Solicitamos o ajuste da documentação anexada."],
  ["Área divergente", "Área divergente: Solicitamos a correção da área total/unidade de medida para {{area_correta}}, conforme documento anexado."],
  ["Logradouro", "Logradouro: Conforme o documento, solicitamos o ajuste do logradouro para {{logradouro_correto}}."],
  ["Número", "Número: Conforme o documento, solicitamos o ajuste para {{numero_correto}}."],
  ["Município", "Município: Solicitamos a correção do município para {{municipio_correto}}, conforme documento anexado."],
  ["Matrícula", "Matrícula: Solicitamos a correção da matrícula para {{matricula_correta}}."],
  ["NIRF", "NIRF: Solicitamos a correção do NIRF para {{nirf_correto}}."],
  ["INCRA", "INCRA: Solicitamos a correção do INCRA para {{incra_correto}}."],
  ["Número do chassi", "Número do chassi: O número do chassi está divergente do documento. Solicitamos a correção para {{chassi_correto}}."],
  ["Tipo do chassi", "Tipo do chassi: O tipo do chassi está divergente do documento. Solicitamos a correção para {{tipo_chassi_correto}}."],
  ["Renavam", "Renavam: O número do Renavam está divergente do documento. Solicitamos a correção para {{renavam_correto}}."],
  ["Placa", "Placa: A placa está divergente do documento. Solicitamos a correção para {{placa_correta}}."],
  ["UF", "UF: A UF está divergente. Solicitamos o ajuste para {{uf_correta}}."],
  ["Ano de fabricação", "Ano de fabricação: O ano de fabricação está incorreto. Solicitamos a correção para {{ano_fabricacao_correto}}."],
  ["Ano modelo", "Ano modelo: O ano modelo está incorreto. Solicitamos a correção para {{ano_modelo_correto}}."],
  ["Tipo cor automóvel", "Tipo cor automóvel: Solicitamos a correção do tipo cor para {{tipo_cor_correto}}."],
];

const relRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Falta de documento comprobatório", "Falta de documento comprobatório: Solicitamos o envio de {{documento_solicitado}}."],
  ["Aprovação sem validação — Indisponibilidade de acesso gratuito", "Aprovado sem validação: Consulta não realizada devido à indisponibilidade de acesso gratuito no estado."],
  ["Aprovação sem validação — Restrição de acesso", "Aprovado sem validação: Consulta não realizada devido à restrição de acesso ou indisponibilidade."],
  ["Data de início de mandato — Aprovado conforme vigente", "Data de início de mandato: Aprovado conforme data do vigente."],
  ["Número de registro", "Número de registro: Solicitamos a correção do número de registro para {{numero_registro}}, conforme consta no documento anexado."],
  ["Número do livro", "Número do livro: Solicitamos que seja preenchido o número de registro no órgão competente para {{numero_registro}}, conforme consta no documento anexado."],
  ["Percentual do capital social", "Percentual do capital social: Solicitamos a correção do percentual do capital social para {{percentual_correto}}, conforme consta no documento anexado."],
  ["Tipo de relacionamento", "Tipo de relacionamento: Solicitamos a correção do tipo de relacionamento para {{tipo_relacionamento_correto}}, conforme consta no documento anexado."],
  ["Data de início de mandato", "Data de início de mandato: Solicitamos a correção da data de início de mandato para {{data_inicio_mandato}}, conforme consta no documento anexado."],
  ["Data de fim de mandato", "Data de fim de mandato: Solicitamos a correção da data de fim de mandato para {{data_fim_mandato}}, conforme consta no documento anexado."],
  ["Documento inválido — Descrição", "Documento inválido: O documento anexado se refere a uma {{descricao_documento}}. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Captura de tela/print", "Documento inválido: O documento anexado se refere a uma CAPTURA DE TELA/PRINT. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Ilegível", "Documento inválido: O documento anexado se refere a um DOCUMENTO ILEGÍVEL. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Informar motivo", "Documento inválido: O documento anexado se refere a um DOCUMENTO INVÁLIDO, pois {{motivo_invalidade}}. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Cortado/rasurado", "Documento inválido: O documento anexado se refere a um DOCUMENTO CORTADO/RASURADO. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Incompleto", "Documento inválido: O documento anexado se refere a um DOCUMENTO INCOMPLETO, pois {{motivo_incompleto}}. Solicitamos o ajuste da documentação anexada."],
];

const relPfRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Falta de documento comprobatório", "Falta de documento comprobatório: Solicitamos o envio de {{documento_solicitado}}."],
  ["Data de início de mandato — Aprovado conforme vigente", "Data de início de mandato: Aprovado conforme data do vigente."],
  ["Data de início de mandato", "Data de início de mandato: Solicitamos a correção da data de início de mandato para {{data_inicio_mandato}}, conforme consta no documento anexado."],
  ["Data de fim de mandato", "Data de fim de mandato: Solicitamos a correção da data de fim de mandato para {{data_fim_mandato}}, conforme consta no documento anexado."],
  ["Tipo de relacionamento", "Tipo de relacionamento: Solicitamos a correção do tipo de relacionamento para {{tipo_relacionamento_correto}}, conforme consta no documento anexado."],
  ["Documento inválido — Descrição", "Documento inválido: O documento anexado se refere a uma {{descricao_documento}}. Solicitamos o ajuste da documentação anexada."],
  ["Número de registro", "Número de registro: Solicitamos a correção do número de registro para {{numero_registro}}, conforme consta no documento anexado."],
];

const prodRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Código de inscrição", "Código de inscrição: Solicitamos a correção do código de inscrição para {{codigo_inscricao}}."],
  ["Falta de documento comprobatório", "Falta de documento comprobatório: Solicitamos o envio de {{documento_solicitado}}."],
  ["Falta de documento comprobatório — Renda agropecuária/CAF", "Falta de documento comprobatório: Necessário atualizar a renda agropecuária, conforme as orientações do Manual de Cadastro, Capítulo 4, Seção 1, ou anexar um CAF ativo do produtor."],
  ["Chaves incorretas", "Chaves incorretas: Solicitamos o ajuste {{detalhamento_ajuste}}."],
  ["Prazo de validade", "Prazo de validade: O documento está fora do prazo. Solicitamos que seja anexado um documento atualizado."],
  ["Vínculo não encontrado", "Vínculo não encontrado: Não foi possível encontrar vínculo entre o associado e o terceiro informado no comprovante em anexo. Solicitamos que seja anexado um comprovante em nome do associado."],
  ["Categoria do produtor — Aprovado conforme rendas vigentes", "Categoria do produtor: Aprovado conforme as rendas vigentes, visto que as rendas pendentes ultrapassaram o prazo de 2h."],
  ["Categoria do produtor — Ajuste de porte conforme rendas vigentes", "Categoria do produtor: De acordo com as rendas vigentes do cadastro, o porte do produtor deve ser ajustado para {{porte_correto}}, visto que as rendas pendentes ultrapassaram o prazo de 2h."],
  ["Categoria do produtor — Pequeno Produtor", 'Categoria do produtor: Ajustar porte para Pequeno Produtor conforme Regras no MCR 1-2-3 A, e no item 5, alínea "e" + MCR 10-2.'],
  ["Categoria do produtor — Médio Produtor", 'Categoria do produtor: Ajustar porte para Médio Produtor conforme Regras no MCR 1-2-3 B, e no item 5, alínea "f" + MCR 8-1.'],
  ["Categoria do produtor — Grande Produtor", 'Categoria do produtor: Ajustar porte para Grande Produtor conforme Regras no MCR 1-2-3 C, e no item 5, alínea "g".'],
  ["Categoria do produtor — Renda sem documento e sem último usuário", "Categoria do produtor: O porte deve estar alinhado com as rendas, as mesmas encontram-se desatualizadas desde {{data_desatualizacao}}. Por gentileza, verificar e atualizar as rendas para atribuição do porte correto."],
];

const endRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Número", "Número: Conforme o documento, solicitamos o ajuste para {{numero_correto}}."],
  ["Logradouro", "Logradouro: Conforme o documento, solicitamos o ajuste do logradouro para {{logradouro_correto}}."],
  ["Tipo de endereço", "Tipo de endereço: Solicitamos o ajuste do tipo de endereço para {{tipo_endereco_correto}}."],
  ["Vínculo não encontrado", "Vínculo não encontrado: Não foi possível encontrar vínculo entre o associado e o terceiro informado no comprovante em anexo. Solicitamos que seja anexado um comprovante em nome do associado ou a comprovação do vínculo."],
  ["Prazo de validade", "Prazo de validade: Solicitamos que seja anexado um comprovante dentro do prazo de validade aceito."],
  ["Assinaturas", "Assinaturas: Solicitamos o ajuste das assinaturas, pois {{motivo_ajuste}}."],
  ["Falta de documento comprobatório", "Falta de documento comprobatório: Solicitamos o envio de {{documento_solicitado}}."],
  ["Documento inválido — Captura de tela/print", "Documento inválido: O documento anexado se refere a uma CAPTURA DE TELA/PRINT. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Ilegível", "Documento inválido: O documento anexado se refere a um DOCUMENTO ILEGÍVEL. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Informar motivo", "Documento inválido: O documento anexado se refere a um DOCUMENTO INVÁLIDO, pois {{motivo_invalidade}}. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Cortado/rasurado", "Documento inválido: O documento anexado se refere a um DOCUMENTO CORTADO/RASURADO. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Incompleto", "Documento inválido: O documento anexado se refere a um DOCUMENTO INCOMPLETO, pois {{motivo_incompleto}}. Solicitamos o ajuste da documentação anexada."],
];

const certRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Data de emissão", "Data de emissão: Solicitamos a correção da data de emissão para {{data_emissao}}."],
  ["Número da certidão", "Número da certidão: Solicitamos a correção do número da certidão para {{numero_certidao}}."],
  ["Tipo de certidão", "Tipo de certidão: Solicitamos a correção do tipo de certidão para {{tipo_certidao}}."],
  ["Prazo de validade", "Prazo de validade: O documento está fora do prazo. Solicitamos que seja anexado um documento atualizado."],
  ["Falta de documento comprobatório", "Falta de documento comprobatório: Solicitamos o envio de {{documento_solicitado}}."],
];

const tribRaw: [string, string][] = [
  ["Aprovação sem validação", 'Aprovação sem validação: Não havia documentos na aba "novo". Aprovado conforme documentos vigentes.'],
  ["Erro no Sisbr", "Erro: {{erro_sisbr}}"],
  ["Documento não abre para análise", "Erro: Documento não abre para análise. Favor verificar se o arquivo possui criptografia ou alguma restrição que impeça sua abertura e realizar novo anexo."],
  ["Falta de documento comprobatório — SIM para NÃO", "Falta de documento comprobatório: Solicitamos o envio de documentação, pois de SIM para NÃO é necessário conter documento."],
];

const padraoRaw: [string, string][] = [
  ["Documento inválido — Captura de tela/print", "Documento inválido: O documento anexado se refere a uma CAPTURA DE TELA/PRINT. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Ilegível", "Documento inválido: O documento anexado se refere a um DOCUMENTO ILEGÍVEL. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Informar motivo", "Documento inválido: O documento anexado se refere a um DOCUMENTO INVÁLIDO, pois {{motivo_invalidade}}. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Cortado/rasurado", "Documento inválido: O documento anexado se refere a um DOCUMENTO CORTADO/RASURADO. Solicitamos o ajuste da documentação anexada."],
  ["Documento inválido — Incompleto", "Documento inválido: O documento anexado se refere a um DOCUMENTO INCOMPLETO, pois {{motivo_incompleto}}. Solicitamos o ajuste da documentação anexada."],
];

const build = (rows: [string, string][], categoryId: string, prefix: string) =>
  rows.map(([title, text], i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, "0")}`,
    categoryId,
    title,
    text,
  }));

export const SEED_TEMPLATES = [
  ...build(pjRaw, PJ, "pj"),
  ...build(pfRaw, PF, "pf"),
  ...build(rendaRaw, RENDA, "rj"),
  ...build(rendaPfRaw, RENDA_PF, "rp"),
  ...build(agroRaw, AGRO, "ra"),
  ...build(irpfRaw, IRPF, "irpf"),
  ...build(bemRaw, BEM, "bn"),
  ...build(relRaw, REL, "rel"),
  ...build(relPfRaw, REL_PF, "relpf"),
  ...build(prodRaw, PROD, "prod"),
  ...build(endRaw, END, "end"),
  ...build(certRaw, CERT, "cert"),
  ...build(tribRaw, TRIB, "trib"),
  ...build(padraoRaw, PADRAO, "dp"),
];
