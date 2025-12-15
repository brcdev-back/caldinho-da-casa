function pedido(tipo) {
  const numero = "5581991610473";
  const mensagem = `Olá! Gostaria de pedir um caldinho de feijão (${tipo}).`;
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(link, "_blank");
}
