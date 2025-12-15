function pedido(tipo) {
  const numero = "5581991610473";
  const mensagem =
    `Olá! Quero pedir um caldinho de feijão (${tipo}).\n` +
    `Bloco:\nApartamento:\nForma de pagamento (Pix):`;
    
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}
