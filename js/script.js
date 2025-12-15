let quantidade = 1;
const chavePix = "81991610473";

function alterarQtd(valor) {
  quantidade += valor;
  if (quantidade < 1) quantidade = 1;
  document.getElementById("qtd").innerText = quantidade;
}

function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada com sucesso!");
}

function pedido(tipo) {
  const numero = "5581991610473";

  const bloco = document.getElementById("bloco").value.trim();
  const apartamento = document.getElementById("apartamento").value.trim();
  const piscina = document.getElementById("piscina").checked;

  if (bloco === "" || apartamento === "") {
    alert("Por favor, informe o bloco e o apartamento.");
    return;
  }

  const localEntrega = piscina ? "Piscina" : "Apartamento";

  const mensagem =
` *PEDIDO – CALDINHO DE FEIJÃO*

 *Tipo:* ${tipo}
 *Quantidade:* ${quantidade}

 *Bloco:* ${bloco}
 *Apartamento:* ${apartamento}
 *Entrega:* ${localEntrega}

 *Pagamento:* Pix
`;

  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}
