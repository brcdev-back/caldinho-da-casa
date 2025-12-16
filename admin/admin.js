const SENHA_ADMIN = "1234";

function login() {
  const senha = document.getElementById("senha").value;

  if (senha === SENHA_ADMIN) {
    document.getElementById("login").style.display = "none";
    document.getElementById("painel").style.display = "block";
  } else {
    alert("Senha incorreta");
  }
}

function confirmarPedido() {
  const numero = document.getElementById("numeroCliente").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!numero || !mensagem) {
    alert("Preencha todos os campos");
    return;
  }

  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

