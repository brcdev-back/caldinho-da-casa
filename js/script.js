const numeroWhats = "5581991610473";

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

function finalizarPedido() {
  const bloco = document.getElementById("bloco").value;
  const apto = document.getElementById("apto").value;
  const piscina = document.getElementById("piscina").checked;

  if (!bloco || !apto) {
    alert("Informe bloco e apartamento");
    return;
  }

  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Adicione pelo menos um item");
    return;
  }

  let mensagem = "PEDIDO - CALDINHO DE FEIJÃO\n\n";

  if (produtos.completo.qtd > 0)
    mensagem += `• Feijão Completo: ${produtos.completo.qtd}\n`;

  if (produtos.simples.qtd > 0)
    mensagem += `• Feijão sem Charque: ${produtos.simples.qtd}\n`;

  mensagem += `\nBloco: ${bloco}\nApartamento: ${apto}`;
  mensagem += `\nEntrega: ${piscina ? "Piscina" : "Apartamento"}`;

  window.open(
    `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
}
