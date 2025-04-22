document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que a página recarregue

  const email = document.getElementById("email").value;
  const codigo = document.getElementById("codigo").value;

  // TESTE: alerta e consola
  alert(`Tentativa de login com:\nEmail: ${email}\nID: ${codigo}`);
  console.log("Login submetido:", email, codigo);

  const redirectURL = `https://script.google.com/macros/s/AKfycbzBNmDTc3Aqy6RbtiFcXAG7gkKjRhDmQ7ZxJHPoDp-WbFClnMVjtQQtwJvb5_UJfjn-EQ/exec?email=${encodeURIComponent(email)}&codigo=${encodeURIComponent(codigo)}`;

  window.open(redirectURL, "_blank"); // nova aba
});
