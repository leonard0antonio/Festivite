// ELEMENTOS
const titleInput = document.getElementById("eventTitle");
const dateInput = document.getElementById("eventDate");
const locInput = document.getElementById("eventLocation");
const colorInput = document.getElementById("bgColor");
const imgInput = document.getElementById("imageInput");
const terms = document.getElementById("terms");

const previewBtn = document.getElementById("previewBtn");
const generateBtn = document.getElementById("generateBtn");

const canvas = document.getElementById("inviteCanvas");
const ctx = canvas.getContext("2d");

// Variável para armazenar imagem carregada
let loadedImage = null;

// ======== TEMPLATE ATUAL =========
let currentTemplate = "minimal";

// Listagem de templates
const templates = {
  minimal: drawMinimal,
  neon: drawNeon,
  floral: drawFloral,
  kids: drawKids
};

/* ------------ Carregar imagem ------------- */
imgInput.addEventListener("change", () => {
  const file = imgInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    loadedImage = new Image();
    loadedImage.src = reader.result;
    loadedImage.onload = () => drawPreview();
  };
  reader.readAsDataURL(file);
});


/* ======================================================
   FUNÇÕES DE TEMPLATES PROFISSIONAIS
====================================================== */

/* ------------ 1. Minimalista Elegante ------------ */
function drawMinimal() {
  // fundo básico
  ctx.fillStyle = colorInput.value || "#111827";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // imagem opcional
  if (loadedImage) ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);

  // texto
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px Arial";
  ctx.fillText(titleInput.value || "Título do Evento", 50, 90);

  ctx.font = "28px Arial";
  ctx.fillText(dateInput.value || "Data não definida", 50, 160);
  ctx.fillText(locInput.value || "Local não informado", 50, 210);
}

/* ------------ 2. Festa Neon ------------ */
function drawNeon() {
  // Fundo neon
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#1e00ff");
  gradient.addColorStop(1, "#ff00c8");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (loadedImage) ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);

  ctx.shadowBlur = 20;
  ctx.shadowColor = "#fff";

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 60px Arial";
  ctx.fillText(titleInput.value || "FESTA NEON", 40, 100);

  ctx.font = "30px Arial";
  ctx.fillText(dateInput.value || "00/00/0000", 40, 170);
  ctx.fillText(locInput.value || "Local", 40, 220);

  ctx.shadowBlur = 0; // reset
}

/* ------------ 3. Floral Sofisticado ------------ */
function drawFloral() {
  // Fundo claro
  ctx.fillStyle = "#fff7f7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Moldura floral simples
  ctx.strokeStyle = "#e29aa3";
  ctx.lineWidth = 15;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  if (loadedImage) ctx.drawImage(loadedImage, 40, 40, canvas.width - 80, canvas.height - 80);

  ctx.fillStyle = "#b03f55";
  ctx.font = "bold 46px serif";
  ctx.fillText(titleInput.value || "Evento Floral", 60, 120);

  ctx.font = "26px serif";
  ctx.fillText(dateInput.value || "00/00/0000", 60, 180);
  ctx.fillText(locInput.value || "Local do evento", 60, 220);
}

/* ------------ 4. Aniversário Infantil ------------ */
function drawKids() {
  // Fundo colorido
  ctx.fillStyle = "#ffdf70";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Balões
  drawBalloon(150, 100, "red");
  drawBalloon(300, 80, "blue");
  drawBalloon(500, 120, "green");

  if (loadedImage) ctx.drawImage(loadedImage, 0, 250, canvas.width, 200);

  ctx.fillStyle = "#000";
  ctx.font = "bold 48px Comic Sans MS";
  ctx.fillText(titleInput.value || "Feliz Aniversário!", 40, 80);

  ctx.font = "28px Comic Sans MS";
  ctx.fillText(dateInput.value || "00/00/0000", 40, 140);
  ctx.fillText(locInput.value || "Local do evento", 40, 190);
}

// desenhar balões (utilidade)
function drawBalloon(x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 40, 55, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#444";
  ctx.beginPath();
  ctx.moveTo(x, y + 55);
  ctx.lineTo(x, y + 120);
  ctx.stroke();
}


/* ======================================================
   SISTEMA DE PRÉ-VISUALIZAÇÃO
====================================================== */

function drawPreview() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  templates[currentTemplate](); // chama o template atual
}

/* Botão de Pré-visualizar */
previewBtn.addEventListener("click", drawPreview);


/* ======================================================
   DOWNLOAD PNG
====================================================== */

generateBtn.addEventListener("click", () => {
  if (!terms.checked) {
    alert("Você deve aceitar os termos antes de gerar o convite.");
    return;
  }

  drawPreview();

  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = "convite-festivite.png";
  a.click();
});


/* ======================================================
   ADICIONAR BOTÕES PARA TROCAR DE TEMPLATE
====================================================== */
const form = document.getElementById("inviteForm");

// Adiciona um seletor simples
const select = document.createElement("select");
select.id = "templateSelect";
select.innerHTML = `
  <option value="minimal">Minimalista</option>
  <option value="neon">Festa Neon</option>
  <option value="floral">Floral</option>
  <option value="kids">Infantil</option>
`;
form.insertBefore(select, form.firstChild);

select.addEventListener("change", () => {
  currentTemplate = select.value;
  drawPreview();
});
