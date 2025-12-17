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
  document.getElementById("total-completo").innerText = `Total: R$ ${totalCompleto.toFixed(2).replace(".", ",")}`;
  document.getElementById("total-simples").innerText = `Total: R$ ${totalSimples.toFixed(2).replace(".", ",")}`;
  document.getElementById("total-geral").innerText = `R$ ${(totalCompleto + totalSimples).toFixed(2).replace(".", ",")}`;
}

function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

function pedido(id) {
  const bloco = document.getElementById("bloco" + id).value;
  const apto = document.getElementById("apto" + id).value;
  const piscina = document.getElementById("piscina" + id).checked;

  if (!bloco || !apto) {
    alert("Informe bloco e apartamento.");
    return;
  }

  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Selecione ao menos um produto.");
    return;
  }

  let msg = "PEDIDO – SABOR DE PANELA\n\n";
  if (produtos.completo.qtd > 0) msg += `• Feijão Completo: ${produtos.completo.qtd}\n`;
  if (produtos.simples.qtd > 0) msg += `• Feijão sem Charque: ${produtos.simples.qtd}\n`;

  msg += `\nBloco: ${bloco}\nApartamento: ${apto}\nEntrega: ${piscina ? "Piscina" : "Apartamento"}\nPagamento: Pix`;

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);
}

function finalizarPedido() {
  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Selecione ao menos um produto antes de finalizar.");
    return;
  }

  let msg = "PEDIDO – SABOR DE PANELA\n\n";
  if (produtos.completo.qtd > 0) msg += `• Feijão Completo: ${produtos.completo.qtd}\n`;
  if (produtos.simples.qtd > 0) msg += `• Feijão sem Charque: ${produtos.simples.qtd}\n`;

  msg += `\nTotal Geral: R$ ${(produtos.completo.qtd*produtos.completo.preco + produtos.simples.qtd*produtos.simples.preco).toFixed(2).replace(".", ",")}\nPagamento: Pix`;

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);
}
