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
