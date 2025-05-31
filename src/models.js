const typeNames = {
  'minute': 'Ata',
  'power-of-attorney': 'Procuração',
  'contract': 'Contrato',
  'authorization': 'Autorização',
  'term': 'Termo',
  'other': 'Outros'
};

const extension = '.docx';
const modelsPath = '../assets/data/models_data.json';
const documentsPath = '../assets/documents/';

async function openForm(type) {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => card.classList.remove("active"));

  const selectedCard = Array.from(cards).find(card =>
    card.getAttribute("data-type") === type
  );
  if (selectedCard) selectedCard.classList.add("active");

  const container = document.getElementById("example");
  container.innerHTML = `<p>Carregando documentos de ${typeNames[type]}...</p>`;

  try {
    const response = await fetch(modelsPath);
    const data = await response.json();

    const modelData = data[type];

    if (!modelData || !modelData.documents || modelData.documents.length === 0) {
      container.innerHTML = `<p>Nenhum documento encontrado para ${typeNames[type]}.</p>`;
      return;
    }

    const { title, description, documents } = modelData;

    const docHtml = documents.map(filename => {
      const displayName = filename.replace(/_/g, ' ').replace(extension, '');
      const filePath = `${documentsPath}${type}/${filename}`;
      return `
        <div class="doc-card">
          <h3>${displayName}</h3>
          <a href="${filePath}" download>📥 Baixar</a>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div class="documents-container">
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="documents-list">${docHtml}</div>
      </div>
    `;
  } catch (err) {
    console.error("Erro ao carregar os dados:", err);
    container.innerHTML = `<p>Erro ao carregar os modelos de documentos.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const type = card.getAttribute("data-type");
      openForm(type);
    });
  });
});
