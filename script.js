
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const codigo = document.getElementById("codigo").value;

  fetch(
    `https://script.google.com/macros/s/AKfycbws25WvmpohT_LQIygufVFLiBO184Wtpar5IIQkYwUtt0cEOKkDxSEhjHT_PpEKEv2_lw/exec?email=${email}&codigo=${codigo}`
  )
    .then((res) => res.text())
    .then((html) => {
      document.open();
      document.write(html);
      document.close();
    })
    .catch((err) => {
      alert("Erro ao contactar o servidor. Tenta novamente.");
      console.error(err);
    });
});
