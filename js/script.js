/* ===== CONFIGURAÇÕES ===== */
const numero = "5581991610473"; // SEU WHATSAPP
const chavePix = "81991610473"; // SEU PIX (guardado, não exibido)

/* ===== PRODUTOS ===== */
const produtos = {
  completo: { preco: 5, qtd: 0 },
  simples: { preco: 4, qtd: 0 }
};

/* ===== QUANTIDADE ===== */
function alterarQtd(tipo, valor) {
  produtos[tipo].qtd += valor;
  if (produtos[tipo].qtd < 0) produtos[tipo].qtd = 0;

  document.getElementById(`qtd-${tipo}`).innerText = produtos[tipo].qtd;
  atualizarTotais();
}

/* ===== TOTAIS ===== */
function atualizarTotais() {
  const totalCompleto = produtos.completo.qtd * produtos.completo.preco;
  const totalSimples = produtos.simples.qtd * produtos.simples.preco;
  const totalGeral = totalCompleto + totalSimples;

  document.getElementById("total-completo").innerText =
    `Total: R$ ${totalCompleto.toFixed(2).replace(".", ",")}`;

  document.getElementById("total-simples").innerText =
    `Total: R$ ${totalSimples.toFixed(2).replace(".", ",")}`;

  document.getElementById("total-geral").innerText =
    `Total do pedido: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
}

/* ===== FINALIZAR PEDIDO ===== */
function finalizarPedido() {
  const bloco = document.getElementById("bloco").value.trim();
  const apto = document.getElementById("apto").value.trim();
  const piscina = document.getElementById("piscina").checked;

  if (!bloco || !apto) {
    alert("⚠️ Informe bloco e apartamento.");
    return;
  }

  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("⚠️ Selecione ao menos um produto.");
    return;
  }

  let msg = " *NOVO PEDIDO – CALDINHO DE FEIJÃO*\n\n";

  if (produtos.completo.qtd > 0) {
    msg += `• Feijão Completo: ${produtos.completo.qtd}\n`;
  }

  if (produtos.simples.qtd > 0) {
    msg += `• Feijão sem Charque: ${produtos.simples.qtd}\n`;
  }

  msg += `\n Bloco: ${bloco}`;
  msg += `\n Apartamento: ${apto}`;
  msg += `\n Entrega: ${piscina ? "Piscina" : "Apartamento"}`;

  const total =
    produtos.completo.qtd * produtos.completo.preco +
    produtos.simples.qtd * produtos.simples.preco;

  msg += `\n\n Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  msg += `\n Pagamento: Pix`;

  window.location.href =
    `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
}
