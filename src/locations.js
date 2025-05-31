// Popula dropdown de cidades
const filtering = document.getElementById("city-filter");
if (filtering) {
  citiesES.forEach((city) => {
    const option = document.createElement("option");
    option.value = cityValueMap[city];
    option.textContent = city;
    filtering.appendChild(option);
  });
}

const container = document.getElementById("locations-content");
let cityData = {};

// Carrega dados do JSON
fetch("../assets/data/city_data.json")
  .then(res => {
    if (!res.ok) throw new Error("Erro ao carregar o JSON");
    return res.json();
  })
  .then(data => {
    cityData = data;
    loadContent("all");
  })
  .catch(err => {
    console.error(err);
    container.textContent = "Erro ao carregar conteúdo.";
  });

// Atualiza ao mudar filtro
filtering.addEventListener("change", function () {
  loadContent(this.value);
});

// Função principal para carregar os dados
function loadContent(filterRaw) {
  const isAll = filterRaw.trim().toLowerCase() === "all";
  const filter = filterRaw.trim();
  container.innerHTML = "";

  const citiesToShow = isAll
    ? Object.entries(cityData)
    : [[filter, cityData[filter]]];

  citiesToShow.forEach(([cityKey, cityObj]) => {
    const cityDiv = document.createElement("div");
    cityDiv.className = `${cityKey.toLowerCase()} city activated`;

    // Cabeçalho e slider
    cityDiv.innerHTML = `
      <h2>${cityObj.name}</h2>
      <div class="toggle-switch">
      <span>Localizações gerais (mapa):</span>
        <label class="switch">
          <input type="checkbox" class="locationToggle" data-city="${cityKey}" />
          <span class="slider"></span>
        </label>
      </div>
    `;

    // Conteúdo principal da cidade
    const contentContainer = document.createElement("div");
    contentContainer.className = "cityContent";
    contentContainer.dataset.city = cityKey;

    if (!cityObj.locals || cityObj.locals.length === 0) {
      contentContainer.innerHTML = `<p>Nenhum local registrado nesta cidade ainda.</p>`;
    } else {
      cityObj.locals.forEach(local => {
        const divLocal = document.createElement("div");
        divLocal.className = "local";
        divLocal.innerHTML = `
          <h3>${local.title}</h3>
          <a href="${local.link}" target="_blank">Visualizar no mapa.</a>
          <p class="description">${local.description}</p>
        `;
        contentContainer.appendChild(divLocal);
      });
    }

    cityDiv.appendChild(contentContainer);

    // Mapa (iframe escondido por padrão)
    const mapDiv = document.createElement("div");
    mapDiv.className = "mapContainer";
    mapDiv.dataset.city = cityKey;
    mapDiv.style.display = "none";
    mapDiv.innerHTML = `
      <iframe class="cityMapIframe" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"
        src="${myMapsLinks[cityKey] || ''}">
      </iframe>
    `;
    cityDiv.appendChild(mapDiv);

    container.appendChild(cityDiv);
  });

  addSliderListeners();
}

// Liga os sliders
function addSliderListeners() {
  const toggles = document.querySelectorAll(".locationToggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("change", function () {
      const city = this.dataset.city;
      const contentDiv = document.querySelector(`.cityContent[data-city="${city}"]`);
      const mapDiv = document.querySelector(`.mapContainer[data-city="${city}"]`);

      if (this.checked) {
        contentDiv.style.display = "none";
        mapDiv.style.display = "block";
      } else {
        contentDiv.style.display = "block";
        mapDiv.style.display = "none";
      }
    });
  });
}
