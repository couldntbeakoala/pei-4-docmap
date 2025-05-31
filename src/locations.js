// Adiciona opções de cidade ao dropdown (página localidades), cidades presentes em 'main.js'
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

// Renderiza conteúdo com base no filtro
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

    // Título da cidade
    cityDiv.innerHTML = `<h2>${cityObj.name}</h2>`;

    // Se não houver locais ainda
    if (!cityObj.locals || cityObj.locals.length === 0) {
      cityDiv.innerHTML += `<p>Nenhum local registrado nesta cidade ainda.</p>`;
    } else {
      // Do contrário, a listagem dos locais
      cityObj.locals.forEach(local => {
        const divLocal = document.createElement("div");
        divLocal.className = "local";
        divLocal.innerHTML = `
          <h3>${local.title}</h3>
          <a href="${local.link}" target="_blank">Visualizar no mapa.</a>
          <p class="description">${local.description}</p>
        `;
        cityDiv.appendChild(divLocal);
      });
    }

    container.appendChild(cityDiv);
  });
}

// Busca os dados ao carregar a página
fetch("../assets/city_data.json")
  .then(res => {
    if (!res.ok) throw new Error("Erro ao carregar o JSON");
    return res.json();
  })
  .then(data => {
    cityData = data;
    loadContent("all"); // Inicialmente, exibe tudo
  })
  .catch(err => {
    console.error(err);
    container.textContent = "Erro ao carregar conteúdo.";
  });

// Atualiza conteúdo ao mudar o filtro
filtering.addEventListener("change", function () {
  loadContent(this.value);
});
