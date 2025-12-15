const chavePix = "81991610473";
const numero = "5581991610473";

const produtos = {
  completo: { preco: 5.00, qtd: 0 },
  simples: { preco: 4.00, qtd: 0 }
};

// ================= QUANTIDADE =================
function alterarQtd(tipo, valor) {
  produtos[tipo].qtd += valor;

  if (produtos[tipo].qtd < 0) {
    produtos[tipo].qtd = 0;
  }

  document.getElementById(`qtd-${tipo}`).innerText = produtos[tipo].qtd;
  atualizarTotais();
}

// ================= TOTAIS =================
function atualizarTotais() {
  let totalGeral = 0;

  for (let tipo in produtos) {
    const total = produtos[tipo].qtd * produtos[tipo].preco;
    totalGeral += total;

    document.getElementById(`total-${tipo}`).innerText =
      `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  // Se você ainda não criou esse elemento no HTML, crie:
  // <div id="total-geral"></div>
  const totalGeralEl = document.getElementById("total-geral");
  if (totalGeralEl) {
    totalGeralEl.innerText =
      `Total do pedido: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
  }
}

// ================= PIX =================
function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

// ================= PEDIDO =================
function pedido(tipo, id) {
  const bloco = document.getElementById("bloco" + id).value;
  const apto = document.getElementById("apto" + id).value;
  const piscina = document.getElementById("piscina" + id).checked;

  if (!bloco || !apto) {
    alert("Informe o bloco e o apartamento.");
    return;
  }

  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Selecione ao menos um produto.");
    return;
  }

  const local = piscina ? "Piscina" : "Apartamento";

  let mensagem =
`PEDIDO – CALDINHO DE FEIJÃO

`;

  if (produtos.completo.qtd > 0) {
    mensagem += `• Feijão Completo: ${produtos.completo.qtd}\n`;
  }

  if (produtos.simples.qtd > 0) {
    mensagem += `• Feijão sem Charque: ${produtos.simples.qtd}\n`;
  }

  const totalFinal =
    produtos.completo.qtd * produtos.completo.preco +
    produtos.simples.qtd * produtos.simples.preco;

  mensagem += `
Bloco: ${bloco}
Apartamento: ${apto}
Entrega: ${local}

Total: R$ ${totalFinal.toFixed(2).replace(".", ",")}
Pagamento: Pix
`;

  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}
