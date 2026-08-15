# Apps Script CRM 29Tech

Cole esta função no Google Apps Script conectado à planilha do CRM 29Tech.

## Colunas esperadas na aba `Página1`

A primeira linha deve conter exatamente estes cabeçalhos:

```
Data | Nome | Empresa | WhatsApp | E-mail | Faturamento | Já usou IA | Agendamento | Origem | Qualificado
```

## Código da função `doPost`

```javascript
function doPost(e) {
  try {
    const spreadsheetId = "1PukFHy-MaTUOYL4BYGwN9dmDFWxr6s6hIsI3o4K6tEI";
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("Página1");

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Aba Página1 nao encontrada" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Cria cabeçalho se a planilha estiver vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Data",
        "Nome",
        "Empresa",
        "WhatsApp",
        "E-mail",
        "Faturamento",
        "Já usou IA",
        "Agendamento",
        "Origem",
        "Qualificado"
      ]);
    }

    // O app envia JSON no body. Tenta ler postData primeiro, depois fallback para form-urlencoded.
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        payload = e.parameter || {};
      }
    } else {
      payload = e.parameter || {};
    }

    const hoje = new Date();
    const dataFormatada = Utilities.formatDate(hoje, "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");

    const nome = payload.nome || "";
    const empresa = payload.empresa || "";
    const whatsapp = payload.whatsapp || "";
    const email = payload.email || "";
    const faturamento = payload.faturamento || "";
    const usouIA = payload.usou_ia || payload.ia || "Não informado";
    const agendamento = payload.agendamento || "Sem agendamento";
    const origem = payload.origem || "Landing Page";

    // Regra de qualificação:
    // - Se marcar horário, qualifica direto
    // - Se não marcou horário, qualifica se tiver WhatsApp e faturamento acima de R$ 0
    let qualificado = "Não";
    if (agendamento && agendamento !== "Sem agendamento") {
      qualificado = "Sim";
    } else if (whatsapp && faturamento && String(faturamento).trim() !== "") {
      const valorNumerico = parseFloat(String(faturamento).replace(/[^0-9.,]/g, "").replace(/\./g, "").replace(/,/g, "."));
      if (!isNaN(valorNumerico) && valorNumerico > 0) {
        qualificado = "Sim";
      }
    }

    const row = [
      dataFormatada,
      nome,
      empresa,
      whatsapp,
      email,
      faturamento,
      usouIA,
      agendamento,
      origem,
      qualificado
    ];

    sheet.appendRow(row);
    const rowId = sheet.getLastRow();

    // Webhook para o CRM interno (opcional)
    const props = PropertiesService.getScriptProperties();
    const webhookUrl = props.getProperty("WEBHOOK_URL");
    if (webhookUrl) {
      UrlFetchApp.fetch(webhookUrl, {
        method: "POST",
        contentType: "application/json",
        payload: JSON.stringify({
          row_id: rowId,
          data: payload,
          qualificado: qualificado,
          data_insercao: dataFormatada
        }),
        headers: {
          "X-Webhook-Secret": props.getProperty("WEBHOOK_SECRET") || ""
        },
        muteHttpExceptions: true
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, row_id: rowId, qualificado: qualificado }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Como publicar

1. Abra o projeto no Apps Script: <https://script.google.com>
2. Cole o código acima no editor, substituindo a função `doPost` atual.
3. Vá em **Configurações do projeto** > **Propriedades > Propriedades do script**.
4. Adicione as propriedades (se usar o webhook do CRM):
   - `WEBHOOK_URL`: URL do seu webhook interno
   - `WEBHOOK_SECRET`: chave secreta do webhook
5. Clique em **Implantar** > **Nova implantação**.
6. Tipo: **Aplicativo da web**.
7. Execute como: **Eu**.
8. Quem pode acessar: **Qualquer pessoa**.
9. Copie a URL de execução e me envie para atualizar o endpoint no código do app.

## Observações

- O app envia os dados no formato JSON, por exemplo:

```json
{
  "nome": "Marcos",
  "empresa": "29Tech",
  "whatsapp": "61999999999",
  "email": "marcos@29tech.com.br",
  "faturamento": "R$ 1.000.000,00",
  "usou_ia": "Sim",
  "agendamento": "Sem agendamento",
  "origem": "Chat de qualificação"
}
```

- Para que a qualificação funcione corretamente, mantenha os nomes das colunas exatamente como indicado na primeira linha da planilha.
