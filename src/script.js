// Shadow DOM para barra de navegação
const navbar = document.getElementById("navbar-container");
const navShadow = navbar.attachShadow({ mode: "open" });

// HTML com espaço específico para os botões de acessibilidade
navShadow.innerHTML = `
  <style>
    nav {
      display: flex;
      flex: auto;
      justify-content: space-between;
      align-items: center;
      background-color: var(--primary-color, #333);
      color: white;
      padding: 1rem;
    }
    .links, .accessibility {
      display: flex;
      gap: 1rem;
      padding: 0 1rem;

      > a {
        text-decoration: none;
        color: white;
      }

      > a:hover {
        color: var(--highlight-color);
      }
    }
    button {
      padding: 0.3rem 0.6rem;
      background-color: var(--secondary-color, #555);
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: var(--highlight-color, #777);
    }
  </style>
  <nav>
    <span>Descomplica Cidadão</span>
    <div class="links">
      <a href="index.html">Início</a>
      <a href="page.html">Page</a>
    </div>
    <div class="accessibility" id="accessibility-area"></div>
  </nav>
`;

// Criar botões de acessibilidade
const btnFontIncrease = document.createElement("button");
btnFontIncrease.textContent = "A+ Fonte";
btnFontIncrease.setAttribute("aria-label", "Aumentar tamanho da fonte");

const btnFontDecrease = document.createElement("button");
btnFontDecrease.textContent = "A- Fonte";
btnFontDecrease.setAttribute("aria-label", "Diminuir tamanho da fonte");

// Inserir botões na div de acessibilidade no Shadow DOM
const accessibilityDiv = navShadow.getElementById("accessibility-area");
accessibilityDiv.appendChild(btnFontIncrease);
accessibilityDiv.appendChild(btnFontDecrease);

// Funcionalidade dos botões
let fontScale = 1;
btnFontIncrease.addEventListener("click", () => {
  fontScale += 0.1;
  document.body.style.fontSize = `${fontScale}em`;
});
btnFontDecrease.addEventListener("click", () => {
  fontScale = Math.max(0.5, fontScale - 0.1); // Limita tamanho mínimo
  document.body.style.fontSize = `${fontScale}em`;
});

// Shadow DOM para rodapé
const footer = document.getElementById("footer-container");
const footerShadow = footer.attachShadow({ mode: "open" });
footerShadow.innerHTML = `
  <footer>
    &copy; 2025 Descomplica Cidadão. Todos os direitos reservados.
  </footer>
`;

// Funções em relação ao mapa
function toggleLocation() {
  const toggle = document.getElementById("locationToggle");
  const locationSection = document.querySelector(".locationSection");
  const cityInput = document.getElementById("city");

  locationSection.style.display = toggle.checked ? "block" : "none";
  cityInput.required = toggle.checked;
}

document.getElementById("city").addEventListener("change", function () {
  const selectedValue = this.value;
  const mapContainer = document.getElementById("mapContainer");

  // Mostra o iframe apenas se o valor for diferente de "Select"
  mapContainer.style.display = selectedValue !== "Select" ? "block" : "none";
});

// Cidades do Espírito Santo
const citiesES = ["Vitória", "Vila Velha", "Serra", "Cariacica"];

const selectCity = document.getElementById("city");
if (selectCity) {
  citiesES.forEach((city) => {
    const option = document.createElement("option");
    option.value = city == "Vitória" ? "Vitoria" : city;
    option.textContent = city;
    selectCity.appendChild(option);
  });

  selectCity.addEventListener("change", () => {
    initMap(selectCity.value);
  });
  window.addEventListener("load", () => {
    initMap(selectCity.value || citiesES[0]);
  });
}

// Google Maps API para mostrar instituições jurídicas próximas ao local selecionado
function initMap(city) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    { address: city + ", ES, Brasil" },
    function (results, status) {
      if (status === "OK") {
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 14,
          center: results[0].geometry.location,
        });

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: results[0].geometry.location,
            radius: 3000,
            type: ["courthouse"],
          },
          function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              results.forEach((place) => {
                new google.maps.Marker({
                  map,
                  position: place.geometry.location,
                  title: place.name,
                });
              });
            }
          },
        );
      }
    },
  );
}

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

window.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("locationToggle");
  const locationSection = document.querySelector(".locationSection");
  const mapContainer = document.getElementById("mapContainer");
  const selectCity = document.getElementById("city");

  if (toggle) toggle.checked = false;
  if (locationSection) locationSection.style.display = "none";
  if (mapContainer) mapContainer.style.display = "none";
  if (selectCity) selectCity.selectedIndex = 0; // Resetar dropdown
});
