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
  msg += `\ Apartamento: ${apto}`;
  msg += `\n Entrega: ${piscina ? "Piscina" : "Apartamento"}`;

  const total =
    produtos.completo.qtd * produtos.completo.preco +
    produtos.simples.qtd * produtos.simples.preco;

  msg += `\n\n Total: R$ ${total.toFixed(2).replace(".", ",")}`;

  window.location.href =
    `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
}
