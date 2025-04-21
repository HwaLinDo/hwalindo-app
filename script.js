// Adiciona o evento ao formulário
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que a página recarregue

  // Recolhe os dados inseridos no formulário
  const email = document.getElementById("email").value;
  const codigo = document.getElementById("codigo").value;

  // URL do teu Google Apps Script publicado como Web App
  const redirectURL = `https://script.google.com/macros/s/AKfycbws25WvmpohT_LQIygufVFLiBO184Wtpar5IIQkYwUtt0cEOKkDxSEhjHT_PpEKEv2_lw/exec?email=${encodeURIComponent(email)}&codigo=${encodeURIComponent(codigo)}`;

  // Abre os dados numa nova aba para contornar restrições do GitHub Pages
  window.open(redirectURL, "_blank");
});
