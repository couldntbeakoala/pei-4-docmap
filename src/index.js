// Adiciona opções de cidade ao dropdown (página principal), cidades presentes em 'main.js'
const selectCity = document.getElementById("city");
if (selectCity) {
  citiesES.forEach((city) => {
    const option = document.createElement("option");
    option.value = cityValueMap[city];
    option.textContent = city;
    selectCity.appendChild(option);
  });
}

/* Funções em relação ao mapa */

function toggleLocation() {
  const toggle = document.getElementById("locationToggle");
  const locationSection = document.querySelector(".locationSection");
  const cityInput = document.getElementById("city");

  locationSection.style.display = toggle.checked ? "block" : "none";
  cityInput.required = toggle.checked;
}

// Atualiza exibição do mapa com base na cidade selecionada
document.getElementById("city").addEventListener("change", function () {
  const selectedValue = this.value;
  const mapContainer = document.getElementById("mapContainer");
  const mapIframe = document.getElementById("mapIframe");

  /* Mapas para cara cidade presente em 'main.js' */

  // Mostra ou oculta iframe
  if (selectedValue !== "Select" && myMapsLinks[selectedValue]) {
    mapIframe.src = myMapsLinks[selectedValue];
    mapContainer.style.display = "block";
  } else {
    mapIframe.src = "";
    mapContainer.style.display = "none";
  }
});

/* Resetar estado da página ao carregar */

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