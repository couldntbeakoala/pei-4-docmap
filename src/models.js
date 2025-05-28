// Apresentação de modelos e explicações
function openExample(type) {
  const area = document.getElementById("example");
  if (!area) return;

  let title = "",
    content = "",
    details = "",
    guide = "",
    example = "";

  if (downloadPDF === "power-of-attorney") {
    title = "Modelo de Procuração Simples";
    content = `PROCURAÇÃO

Eu, [NOME COMPLETO], brasileiro(a), [estado civil], portador(a) do RG nº [RG] e CPF nº [CPF], residente à [ENDEREÇO], nomeio como meu procurador [NOME DO PROCURADOR], portador(a) do CPF nº [CPF PROCURADOR], para me representar junto à Receita Federal.

[LOCAL], [DATA]

Assinatura do Outorgante`;
    details = `Autoriza outra pessoa a agir em seu nome. Usada para resolver assuntos em seu lugar.`;
    guide = `<ol><li>Informe dados completos de ambos.</li><li>Descreva os poderes dados.</li><li>Adicione data e local.</li><li>Assine e reconheça firma.</li></ol>`;
    example = `PROCURAÇÃO

Eu, João da Silva, brasileiro, solteiro, portador do RG nº 1234567 e CPF nº 000.000.000-00, residente à Rua das Palmeiras, 100, nomeio como meu procurador Maria Oliveira, portadora do CPF nº 111.111.111-11, para me representar junto à Receita Federal.

Vitória, 21 de maio de 2025

Assinatura do Outorgante`;
  } else if (downloadPDF === "service-contract") {
    title = "Modelo de Contrato de Prestação de Serviço";
    content = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Contratante: [NOME CONTRATANTE], CPF [CPF]
Contratado: [NOME CONTRATADO], CPF [CPF]

Objeto: [SERVIÇO]
Valor: R$ [VALOR]
Prazo: [PRAZO]

[LOCAL], [DATA]

Assinatura das partes`;
    details = `Estabelece o acordo entre duas partes para prestação de serviço. Define responsabilidade, valor e prazo.`;
    guide = `<ol><li>Insira nome e CPF das partes.</li><li>Especifique o serviço e valor.</li><li>Adicione prazos e local.</li><li>Assine em duas vias.</li></ol>`;
    example = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Contratante: Ana Souza, CPF 222.222.222-22
Contratado: Pedro Martins, CPF 333.333.333-33

Objeto: Manutenção elétrica residencial
Valor: R$ 1.200,00
Prazo: 30 dias

Vila Velha, 21 de maio de 2025

Assinatura das partes`;
  } else if (downloadPDF === "simple-declaration") {
    title = "Modelo de Declaração Simples";
    content = `DECLARAÇÃO

Eu, [NOME], CPF nº [CPF], residente em [ENDEREÇO], declaro que [DECLARAÇÃO].

[LOCAL], [DATA]

Assinatura`;
    details = `Serve para atestar informações por sua própria responsabilidade.`;
    guide = `<ol><li>Insira seus dados.</li><li>Declare com clareza o fato.</li><li>Adicione local e data.</li><li>Assine e reconheça se necessário.</li></ol>`;
    example = `DECLARAÇÃO

Eu, Lucas Pereira, CPF nº 444.444.444-44, residente em Serra/ES, declaro que resido no endereço acima desde janeiro de 2022.

Serra, 21 de maio de 2025

Assinatura`;
  }

  area.innerHTML =
    `
    <h2>${title}</h2>
    <p><strong>Explicação:</strong> ${details}</p>
    <h3>Passo a passo:</h3>
    ${guide}
    <h3>Modelo Base:</h3>
    <pre aria-label="Modelo base">${content}</pre>
    <button onclick="downloadPDF(` +
    "`" +
    content +
    "`" +
    `)">Baixar Modelo em Branco</button>
    <h3>Exemplo Preenchido:</h3>
    <pre aria-label="Exemplo preenchido">${example}</pre>
    <button onclick="downloadPDF(` +
    "`" +
    example +
    "`" +
    `)">Baixar Exemplo Preenchido</button>
  `;
}

// Função para baixar PDF
function downloadPDF(texto) {
  const window = window.open("", "", "width=800,height=600");
  window.document.write(`
    <html><head><title>Descomplica Cidadão</title></head><body>
    <pre style="font-family: "Segoe UI", system-ui, sans-serif; white-space: pre-wrap;">${texto}</pre>
    <script>window.print();</script>
    </body></html>
  `);
  window.document.close();
}