const numero = "5581991610473";
const chavePix = "81991610473";

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
  for (let tipo in produtos) {
    const subtotal = produtos[tipo].qtd * produtos[tipo].preco;
    totalGeral += subtotal;
    document.getElementById(`total-${tipo}`).innerText =
      `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  }
  document.getElementById("total-geral").innerText =
    `Total Geral: R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

function finalizarPedido() {
  const bloco = document.getElementById("bloco").value;
  const apto = document.getElementById("apto").value;
  const piscina = document.getElementById("piscina").checked;

  if (!bloco || !apto) {
    alert("Informe bloco e apartamento.");
    return;
  }

  let msg = "PEDIDO – CALDINHO DE FEIJÃO\n\n";
  let temProduto = false;
  let total = 0;

  for (let tipo in produtos) {
    if (produtos[tipo].qtd > 0) {
      temProduto = true;
      const subtotal = produtos[tipo].qtd * produtos[tipo].preco;
      total += subtotal;
      msg += `• ${produtos[tipo].nome}\nQtd: ${produtos[tipo].qtd} | R$ ${subtotal.toFixed(2).replace(".", ",")}\n\n`;
    }
  }

  if (!temProduto) {
    alert("Selecione ao menos um produto.");
    return;
  }

  msg += `Total Geral: R$ ${total.toFixed(2).replace('.', ',')}\nBloco: ${bloco}\nApartamento: ${apto}\nEntrega: ${piscina ? "Piscina" : "Apartamento"}\nPagamento: Pix`;

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);

  for (let tipo in produtos) produtos[tipo].qtd = 0;
  atualizarTotais();
}
