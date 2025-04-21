const apiKey = "patRX681bcooeY82A.9ae4da138cf63effef497eb77d2b044a0077a2c68adf9c2be746e6aab354322b";
const baseId = "appRdT6BS8uYmIRpJ";

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

function getAluno(email, codigo) {
  const options = {
    method: "get",
    headers: {
      Authorization: "Bearer " + apiKey,
    },
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(`https://api.airtable.com/v0/${baseId}/Alunos`, options);
  const data = JSON.parse(response.getContentText()).records;

  for (const record of data) {
    const fields = record.fields;
    if (
      fields["Email"]?.toLowerCase().trim() === email.toLowerCase().trim() &&
      fields["ID do Aluno"]?.trim() === codigo.trim()
    ) {
      const programaRaw = fields["Nome do Programa"];
      const programa = Array.isArray(programaRaw) ? (programaRaw[0] || "nenhum") : (programaRaw || "nenhum");

      const graduacaoRaw = fields["Nome da Graduação"];
      const graduacao = Array.isArray(graduacaoRaw) ? (graduacaoRaw[0] || "Nenhuma") : (graduacaoRaw || "Nenhuma");

      const brasao = getBrasao(programa);
      const linkdrive = getLinkDrive(programa);

      const exameDataRaw = fields["Data do Exame (from Histórico de Exames)"];
      const exameDataFormatada = exameDataRaw
        ? Utilities.formatDate(new Date(exameDataRaw), "GMT+1", "yyyy-MM-dd")
        : "Nenhum";

      return {
        nome: fields["Alunos"] || "",
        idade: fields["Idade"] || "",
        nascimento: fields["Data de Nascimento"] || "",
        graduacao: graduacao,
        programa: programa,
        brasao: brasao,
        linkdrive: linkdrive,
        mensalidadePaga: fields["Mensalidade Paga"] === true || fields["Mensalidade Paga"] === "checked",
        exame: exameDataFormatada,
        seminario: fields["Título do Seminário (from Inscrito em Seminários)"] || "Nenhum",
        valores: fields["Fichas de Valores Entregues"] || "Nenhuma ficha entregue"
      };
    }
  }
  return null;
}

function getBrasao(programa) {
  const options = {
    method: "get",
    headers: {
      Authorization: "Bearer " + apiKey,
    },
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(`https://api.airtable.com/v0/${baseId}/Programas`, options);
  const data = JSON.parse(response.getContentText()).records;

  for (const record of data) {
    const fields = record.fields;
    const nomeDoPrograma = Array.isArray(fields["Nome do Programa"]) ? fields["Nome do Programa"][0] : fields["Nome do Programa"];
    if (nomeDoPrograma && nomeDoPrograma.toLowerCase() === programa.toLowerCase()) {
      const brasaoField = fields["Brasão"];
      if (brasaoField && brasaoField.length > 0) {
        return brasaoField[0].url;
      }
    }
  }
  return null;
}

function getLinkDrive(programa) {
  const options = {
    method: "get",
    headers: {
      Authorization: "Bearer " + apiKey,
    },
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(`https://api.airtable.com/v0/${baseId}/Programas`, options);
  const data = JSON.parse(response.getContentText()).records;

  for (const record of data) {
    const fields = record.fields;
    const nomeDoPrograma = Array.isArray(fields["Nome do Programa"]) ? fields["Nome do Programa"][0] : fields["Nome do Programa"];
    if (nomeDoPrograma && nomeDoPrograma.toLowerCase() === programa.toLowerCase()) {
      return fields["Link Drive"] || null;
    }
  }
  return null;
}
