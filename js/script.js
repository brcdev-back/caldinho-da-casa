const numero = "5581991610473";
const chavePix = "81991610473";

const produtos = {
  completo: { preco: 5, qtd: 0 },
  simples: { preco: 4, qtd: 0 }
};

function alterarQtd(tipo, valor) {
  produtos[tipo].qtd += valor;
  if (produtos[tipo].qtd < 0) produtos[tipo].qtd = 0;
  document.getElementById(`qtd-${tipo}`).innerText = produtos[tipo].qtd;
  atualizarTotais();
}

function atualizarTotais() {
  const totalCompleto = produtos.completo.qtd * produtos.completo.preco;
  const totalSimples = produtos.simples.qtd * produtos.simples.preco;
  const total = totalCompleto + totalSimples;

  document.getElementById("total-completo").innerText =
    `Total: R$ ${totalCompleto.toFixed(2).replace(".", ",")}`;

  document.getElementById("total-simples").innerText =
    `Total: R$ ${totalSimples.toFixed(2).replace(".", ",")}`;

  document.getElementById("total-geral").innerText =
    `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
}

function finalizarPedido() {
  const bloco = document.getElementById("bloco").value;
  const apto = document.getElementById("apto").value;
  const piscina = document.getElementById("piscina").checked;

  if (!bloco || !apto) {
    alert("Informe bloco e apartamento.");
    return;
  }

  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Selecione ao menos um produto.");
    return;
  }

  let msg = "PEDIDO – CALDINHO DE FEIJÃO\n\n";

  if (produtos.completo.qtd > 0)
    msg += `• Feijão Completo: ${produtos.completo.qtd}\n`;

  if (produtos.simples.qtd > 0)
    msg += `• Feijão sem Charque: ${produtos.simples.qtd}\n`;

  const total =
    produtos.completo.qtd * produtos.completo.preco +
    produtos.simples.qtd * produtos.simples.preco;

  msg += `\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;
  msg += `\nBloco: ${bloco} | Apto: ${apto}`;
  msg += `\nEntrega: ${piscina ? "Piscina" : "Apartamento"}`;
  msg += `\nPagamento: Pix`;
  msg += `\nChave Pix: ${chavePix}`;

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);

  location.reload();
}
