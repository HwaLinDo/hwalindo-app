// Adiciona o evento ao formulário
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que a página recarregue

  // Recolhe os dados inseridos
  const email = document.getElementById("email").value;
  const codigo = document.getElementById("codigo").value;

  // TESTE: mostra alerta para confirmar clique
  alert(`Tentativa de login com:\nEmail: ${email}\nID: ${codigo}`);

  // TESTE: regista no console do navegador
  console.log("Login submetido:", email, codigo);

  // URL do Apps Script
  const redirectURL = `https://script.google.com/macros/s/AKfycbzBNmDTc3Aqy6RbtiFcXAG7gkKjRhDmQ7ZxJHPoDp-WbFClnMVjtQQtwJvb5_UJfjn-EQ/exec/exec?email=${encodeURIComponent(email)}&codigo=${encodeURIComponent(codigo)}`;

  // Abre os dados numa nova aba
  window.open(redirectURL, "_blank");
});
