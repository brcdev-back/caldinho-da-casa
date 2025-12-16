const numero = "5581991610473";

const produtos = {
  completo: { preco: 5, qtd: 0 },
  simples: { preco: 4, qtd: 0 }
};

function alterarQtd(tipo, valor) {
  produtos[tipo].qtd += valor;
  if (produtos[tipo].qtd < 0) produtos[tipo].qtd = 0;

  document.getElementById(`qtd-${tipo}`).innerText = produtos[tipo].qtd;
  atualizar();
}

function atualizar() {
  const t1 = produtos.completo.qtd * produtos.completo.preco;
  const t2 = produtos.simples.qtd * produtos.simples.preco;
  const total = t1 + t2;

  document.getElementById("total-completo").innerText =
    `Total: R$ ${t1.toFixed(2).replace(".", ",")}`;

  document.getElementById("total-simples").innerText =
    `Total: R$ ${t2.toFixed(2).replace(".", ",")}`;

  document.getElementById("total-geral").innerText =
    `Total do pedido: R$ ${total.toFixed(2).replace(".", ",")}`;
}

function finalizarPedido() {
  const bloco = document.getElementById("bloco").value;
  const apto = document.getElementById("apto").value;
  const piscina = document.getElementById("piscina").checked;

  if (!bloco || !apto) {
    alert("Preencha bloco e apartamento");
    return;
  }

  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Selecione ao menos um produto");
    return;
  }

  let msg = " *PEDIDO CALDINHO*\n\n";

  if (produtos.completo.qtd > 0)
    msg += `Feijão Completo: ${produtos.completo.qtd}\n`;

  if (produtos.simples.qtd > 0)
    msg += `Feijão sem Charque: ${produtos.simples.qtd}\n`;

  msg += `\nBloco: ${bloco}\nAp: ${apto}`;
  msg += `\nEntrega: ${piscina ? "Piscina" : "Apartamento"}`;

  const total =
    produtos.completo.qtd * produtos.completo.preco +
    produtos.simples.qtd * produtos.simples.preco;

  msg += `\n\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;

  window.location.href =
    `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
}
