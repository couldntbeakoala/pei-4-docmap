/* UTILIDADES PRINCIPAIS */

// Cidades do Espírito Santo
const citiesES = ["Vitória", "Vila Velha", "Serra", "Cariacica"];
const cityValueMap = {
  "Vitória": "Vitoria",
  "Vila Velha": "Vila_Velha",
  "Serra": "Serra",
  "Cariacica": "Cariacica"
};

// URLs do My Maps para cada cidade
const myMapsLinks = {
  Vitoria: "https://www.google.com/maps/d/u/1/embed?mid=1fSZ4IcJwa_q3xAQ90oe7tjcpw65_U5k&ehbc=2E312F&noprof=1",
  Vila_Velha: "https://www.google.com/maps/d/u/1/embed?mid=1twkbWMtGtSVSFJl4dTWWqL1l11tnP3Q&ehbc=2E312F&noprof=1",
  Cariacica: "https://www.google.com/maps/d/u/1/embed?mid=1hRxiVau_gwZI4F9x9aXgHp2zHwWDSAk&ehbc=2E312F&noprof=1",
  Serra: "https://www.google.com/maps/d/u/1/embed?mid=1L5ZxTjoNbYIdl6DBvn5tD0tdS-qIR9I&ehbc=2E312F&noprof=1",
};

/* SHADOW DOMs */

// Shadow DOM para barra de navegação
const navbar = document.getElementById("navbar-container");
const navShadow = navbar.attachShadow({ mode: "open" });

// HTML com espaço específico para os botões de acessibilidade
navShadow.innerHTML = `
  <style>
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: light-dark(rgb(138, 221, 173), var(--components-color));
      color: light-dark(#043927, #4CBB17);
      > img {
        display: inline-block;
      }
    }
    .branding {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .links, .accessibility {
      display: flex;
      gap: 1rem;
      padding: 0 1rem;

      > a {
        text-decoration: none;
        color: light-dark(#043927, #4CBB17);
      }

      > a:hover {
        color: var(--highlight-color);
      }
    }
    button {
      padding: 0.3rem 0.6rem;
      background-color: var(--secondary-color);
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: var(--highlight-color);
      color: black;
    }
  </style>
  <nav>
    <div class="branding">
      <img src="/assets/logo.png" alt="Descomplica Cidadão" width="128" height="70">
      <!-- <span>Descomplica Cidadão</span> -->
    </div>
    <div class="links">
      <a href="/public/index.html">Início</a>
      <a href="/public/models.html">Modelos de Documentos</a>
      <a href="/public/locations.html">Localidades</a>
    </div>
    <div class="accessibility" id="accessibility-area"></div>
  </nav>
`;

// Criar botões de acessibilidade
const btnFontIncrease = document.createElement("button");
btnFontIncrease.textContent = "A+ Fonte";
btnFontIncrease.setAttribute("style", "border-radius: 6px;")
btnFontIncrease.setAttribute("aria-label", "Aumentar tamanho da fonte");

const btnFontDecrease = document.createElement("button");
btnFontDecrease.textContent = "A- Fonte";
btnFontDecrease.setAttribute("style", "border-radius: 6px;")
btnFontDecrease.setAttribute("aria-label", "Diminuir tamanho da fonte");

// Inserir botões na div de acessibilidade no Navbar Shadow DOM
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
