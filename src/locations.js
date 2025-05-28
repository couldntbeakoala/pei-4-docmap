// Filtragem de cidades
const select = document.getElementById("cityFilter");
const container = document.getElementById("locations-content");
let cityData = {};

// Carrega o conteúdo de acordo com filtro
function loadContent(filter) {
  container.innerHTML = "";

  const citiesToShow = filter === "all"
    ? Object.entries(cityData)
    : [[filter, cityData[filter]]];

  if (citiesToShow.length === 0) {
    container.textContent = "Nenhum conteúdo encontrado.";
    return;
  }

  citiesToShow.forEach(([city, content]) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${city.replace("_", " ").toUpperCase()}:</strong> ${content}`;
    container.appendChild(div);
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
select.addEventListener("change", function () {
  loadContent(this.value);
});