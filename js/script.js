let quantidade = 1;
const chavePix = "81991610473";
const numero = "5581991610473";
const produtos = {
  completo: { preco: 5.00, qtd: 0 },
  simples: { preco: 4.00, qtd: 0 }
};

function alterarQtd(tipo, valor) {
  produtos[tipo].qtd += valor;

  if (produtos[tipo].qtd < 0) {
    produtos[tipo].qtd = 0;
  }

  document.getElementById(`qtd-${tipo}`).innerText = produtos[tipo].qtd;
  atualizarTotais();
}

function atualizarTotais() {
  let totalGeral = 0;

  for (let tipo in produtos) {
    const total = produtos[tipo].qtd * produtos[tipo].preco;
    totalGeral += total;

    document.getElementById(`total-${tipo}`).innerText =
      `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  document.getElementById("total-geral").innerText =
    `Total do pedido: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
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

 if (produtos.completo.qtd > 0) {
    mensagem += `• Feijão Completo: ${produtos.completo.qtd}\n`;
  }
  if (produtos.simples.qtd > 0) {
    mensagem += `• Feijão sem Charque: ${produtos.simples.qtd}\n`;
  }

Bloco: ${bloco}
Apartamento: ${apto}
Entrega: ${local}

Pagamento: Pix`;

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);
}
