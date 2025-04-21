const apiKey = "TUA_API_KEY";
const baseId = "TEU_BASE_ID";

function doGet(e) {
  const email = e.parameter.email;
  const codigo = e.parameter.codigo;
  const jsonMode = e.parameter.json === "true";

  if (!email || !codigo) {
    const errorMessage = { erro: "Parâmetros em falta" };
    return jsonMode
      ? ContentService.createTextOutput(JSON.stringify(errorMessage)).setMimeType(ContentService.MimeType.JSON)
      : HtmlService.createHtmlOutput("Parâmetros em falta. Por favor, verifica o email e o código.");
  }

  const aluno = getAluno(email, codigo);

  if (!aluno) {
    const errorMessage = { erro: "Aluno não encontrado" };
    return jsonMode
      ? ContentService.createTextOutput(JSON.stringify(errorMessage)).setMimeType(ContentService.MimeType.JSON)
      : HtmlService.createHtmlOutput("Aluno não encontrado. Verifica os dados inseridos.");
  }

  if (jsonMode) {
    return ContentService.createTextOutput(JSON.stringify(aluno)).setMimeType(ContentService.MimeType.JSON);
  }

  const template = HtmlService.createTemplateFromFile("paginaaluno");
  template.aluno = aluno;
  return template.evaluate().setTitle("Área do Aluno").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}