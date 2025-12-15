let quantidade = 1;
const chavePix = "81991610473";
const numero = "5581991610473";

function alterarQtd(valor) {
  quantidade += valor;
  if (quantidade < 1) quantidade = 1;
  document.querySelectorAll("#qtd").forEach(q => q.innerText = quantidade);
}

function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

function pedido(tipo, id) {
  const bloco = document.getElementById("bloco" + id).value;
  const apto = document.getElementById("apto" + id).value;
  const piscina = document.getElementById("piscina" + id).checked;

  if (!bloco || !apto) {
    alert("Informe bloco e apartamento");
    return;
  }

  const local = piscina ? "Piscina" : "Apartamento";

  const msg =
`PEDIDO - CALDINHO DE FEIJÃO

Tipo: ${tipo}
Quantidade: ${quantidade}

Bloco: ${bloco}
Apartamento: ${apto}
Entrega: ${local}

Pagamento: Pix`;

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);
}
