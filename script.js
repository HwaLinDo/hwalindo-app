document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const codigo = document.getElementById("codigo").value;

  // Redireciona diretamente para o Apps Script com os parâmetros
  const redirectURL = `https://script.google.com/macros/s/AKfycbws25WvmpohT_LQIygufVFLiBO184Wtpar5IIQkYwUtt0cEOKkDxSEhjHT_PpEKEv2_lw/exec?email=${email}&codigo=${codigo}`;
  window.open(redirectURL, "_blank"); // Abre numa nova aba (evita bloqueio do GitHub Pages)
});
