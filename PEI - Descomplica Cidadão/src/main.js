// Load relevant components
function loadComponents() {
  // Load navbar
  fetch("/components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      setActiveLink();
    });

  // Load footer
  fetch("/components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
}

// Set active navigation link
function setActiveLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}

// Map-ish functions
function toggleLocation() {
  const toggle = document.getElementById("locationToggle");
  const locationSection = document.getElementById("locationSection");
  const cityInput = document.getElementById("city");

  locationSection.style.display = toggle.checked ? "block" : "none";
  cityInput.required = toggle.checked;

  if (toggle.checked) {
    updateMap();
  }
}

function updateMap() {
  const city = document.getElementById("city").value || "Espírito Santo";
  const mapFrame = document.getElementById("mapFrame");
  const apiKey = "CHAVE_API"; // Obtain key: https://developers.google.com/maps

  mapFrame.src = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=Cartório+${encodeURIComponent(city)}+ES&zoom=13`;
}

// Document generator function
function generateDocument(e) {
  e.preventDefault();

  // Getting data
  const formData = {
    name: document.getElementById("userName").value,
    docType: document.getElementById("docType").value,
    city: document.getElementById("locationToggle").checked
      ? document.getElementById("city").value
      : null,
  };

  // Generate doc content
  const docContent =
    `DOCUMENTO JURÍDICO\n\n` +
    `Tipo: ${formData.docType}\n` +
    `Nome do Requerente: ${formData.name}\n` +
    (formData.city ? `Localidade: ${formData.city}, ES\n` : "") +
    `\nTexto jurídico padrão aqui...`;

  // Download (.txt)
  // Change it later to PDF
  const blob = new Blob([docContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `documento-${formData.docType}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
