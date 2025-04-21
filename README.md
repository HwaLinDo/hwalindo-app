# Apps Script - Área do Aluno

Este diretório contém os ficheiros usados no Google Apps Script para validar login de alunos e apresentar os seus dados.

## Ficheiros

- `codigo.gs` — Script principal que processa os parâmetros e comunica com a API do Airtable.
- `paginaaluno.html` — Modelo de página HTML para mostrar os dados do aluno.

## Publicação

1. Acede a [https://script.google.com/](https://script.google.com/).
2. Cria um novo projeto.
3. Cola o conteúdo do `codigo.gs`.
4. Cria um novo ficheiro `.html` chamado `paginaaluno` e cola o HTML correspondente.
5. Publica o script como aplicação web:
   - Implementar como: "Executar como proprietário"
   - Acesso: "Qualquer pessoa, mesmo anónima"
6. Copia o URL de execução e usa-o na tua página de login do GitHub Pages.

---
⚠️ Substitui `TUA_API_KEY` e `TEU_BASE_ID` pelos dados reais do teu Airtable.