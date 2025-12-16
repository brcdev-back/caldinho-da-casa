const numero = "5581991610473"; // SEU NÚMERO

const produtos = {
  completo: { nome: "Feijão Completo", preco: 5, qtd: 0 },
  simples: { nome: "Feijão sem Charque", preco: 4, qtd: 0 }
};

function alterarQtd(tipo, valor) {
  produtos[tipo].qtd += valor;
  if (produtos[tipo].qtd < 0) produtos[tipo].qtd = 0;

  document.getElementById(`qtd-${tipo}`).innerText = produtos[tipo].qtd;
  atualizarTotais();
}

function atualizarTotais() {
  let totalGeral = 0;

  for (let key in produtos) {
    const total = produtos[key].qtd * produtos[key].preco;
    totalGeral += total;

    document.getElementById(`total-${key}`).innerText =
      `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  document.getElementById("total-geral").innerText =
    `Total Geral: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
}

function finalizarPedido() {
  const bloco = document.getElementById("bloco").value;
  const apto = document.getElementById("apto").value;
  const piscina = document.getElementById("piscina").checked;

  if (!bloco || !apto) {
    alert("Informe bloco e apartamento.");
    return;
  }

  let pedido = "";
  let total = 0;

  for (let key in produtos) {
    if (produtos[key].qtd > 0) {
      pedido += `• ${produtos[key].nome}: ${produtos[key].qtd}\n`;
      total += produtos[key].qtd * produtos[key].preco;
    }
  }

  if (pedido === "") {
    alert("Selecione ao menos um produto.");
    return;
  }

  let msg =
` *PEDIDO – CALDINHO DE FEIJÃO*

${pedido}
 Bloco: ${bloco}
 Apartamento: ${apto}
 Entrega: ${piscina ? "Piscina" : "Apartamento"}

 Total: R$ ${total.toFixed(2).replace(".", ",")}
 Pagamento: Pix`;

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);
}
