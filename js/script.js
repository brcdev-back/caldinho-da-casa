function pedido(tipo) {
  const numero = "5581991610473";

  const bloco = document.getElementById("bloco").value;
  const apartamento = document.getElementById("apartamento").value;
  const piscina = document.getElementById("piscina").checked;

  if (bloco === "" || apartamento === "") {
    alert("Por favor, informe o bloco e o apartamento.");
    return;
  }

  const localEntrega = piscina ? "Na piscina" : "No apartamento";

  const mensagem =
` PEDIDO – CALDINHO DE FEIJÃO
  Tipo: ${tipo}

 Bloco: ${bloco}
 Apartamento: ${apartamento}
 Entrega: ${localEntrega}

 Forma de pagamento: Pix
`;

  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}
