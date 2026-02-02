const palavras = [
  "Designer",
  "Full Stack",
  "Analista de Dados",
  "Cibersegurança"
];

let indexPalavra = 0;
let indexLetra = 0;
let apagando = false;
const velocidade = 100;
const elemento = document.getElementById("texto-dinamico");

function escreverTexto() {
  const palavraAtual = palavras[indexPalavra];

  if (!apagando) {
    elemento.textContent = palavraAtual.substring(0, indexLetra + 1);
    indexLetra++;

    if (indexLetra === palavraAtual.length) {
      setTimeout(() => apagando = true, 1200);
    }
  } else {
    elemento.textContent = palavraAtual.substring(0, indexLetra - 1);
    indexLetra--;

    if (indexLetra === 0) {
      apagando = false;
      indexPalavra = (indexPalavra + 1) % palavras.length;
    }
  }

  setTimeout(escreverTexto, velocidade);
}

escreverTexto();


// Modal
function openModal(imageSrc) {
  document.getElementById("certificateModal").style.display = "flex";
  document.getElementById("modalImage").src = imageSrc;
}

function closeModal() {
  document.getElementById("certificateModal").style.display = "none";
}


// Contact Form
emailjs.init({
  publicKey: "W0jbpmRgfwZl87yGK",
});

document.getElementById("contact_form").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  }

  console.table(formData);

  const serviceID = "service_8qpwccp";
  const templateID = "template_k99h22e";
  const submitButton = document.getElementById("button_form");

  emailjs.send(serviceID, templateID, formData)
  .then(() => {
    submitButton.disabled = true;

    Toastify({
      text: "E-mail enviado com sucesso!",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        color: "#fff",
      }
    }).showToast();

    document.getElementById("contact_form").reset();

  })
  .catch((error) => {

    Toastify({
      text: "Erro ao enviar o e-mail.",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        color: "#fff",
      }
    }).showToast();

    console.error("Erro ao enviar o e-mail:", error);

  })
  .finally(() => {
    submitButton.disabled = false;
  });
  
});