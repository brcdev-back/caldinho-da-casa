let quantidade = 1;
const chavePix = "81991610473";

function alterarQtd(valor) {
  quantidade += valor;
  if (quantidade < 1) quantidade = 1;
  document.getElementById("qtd").innerText = quantidade;
}

function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

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
`PEDIDO – CALDINHO DE FEIJÃO
 Tipo: ${tipo}
 Quantidade: ${quantidade}

 Bloco: ${bloco}
 Apartamento: ${apartamento}
 Entrega: ${localEntrega}

 Pagamento: Pix
`;

  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}
