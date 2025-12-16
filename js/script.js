const chavePix = "81991610473"; // TUA CHAVE PIX
const numero = "5581991610473"; // TEU NÚMERO DE WHATSAPP

const produtos = {
  completo: { nome: "Feijão Completo", preco: 5.00, qtd: 0 },
  simples: { nome: "Feijão sem Charque", preco: 4.00, qtd: 0 }
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

  const totalGeralEl = document.getElementById("total-geral");
  if (totalGeralEl) {
    totalGeralEl.innerText =
      `Total do pedido: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
  }
}
// Inicializa o total ao carregar
atualizarTotais();

// ================= PIX =================
function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

// ================= PEDIDO =================
function pedido(tipo, id) {
  const bloco = document.getElementById("bloco" + id).value.trim();
  const apto = document.getElementById("apto" + id).value.trim();
  const piscina = document.getElementById("piscina" + id).checked;

  // Valida se há pelo menos um item selecionado
  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Selecione ao menos um produto.");
    return;
  }
  
  // A validação de endereço só deve ocorrer se houver itens neste card,
  // mas como o pedido é enviado por card, validamos aqui.
  if (!bloco || !apto) {
    alert("Informe o bloco e o apartamento.");
    return;
  }

  const local = piscina ? "Piscina" : `Apto ${apto}`;

  // Lista de itens pedidos
  let itensLista = '';
  const itemCompleto = produtos.completo;
  const itemSimples = produtos.simples;
  
  if (itemCompleto.qtd > 0) {
      itensLista += `• ${itemCompleto.nome}: ${itemCompleto.qtd} un\n`;
  }
  if (itemSimples.qtd > 0) {
      itensLista += `• ${itemSimples.nome}: ${itemSimples.qtd} un\n`;
  }

  const totalFinal = itemCompleto.qtd * itemCompleto.preco + itemSimples.qtd * itemSimples.preco;


  let mensagem =
`*PEDIDO – SABOR NA PANELA*
-----------------------------

*Itens:*
${itensLista}
-----------------------------
*Entrega:*
Bloco: ${bloco}
Local: ${local}

*Total:* R$ ${totalFinal.toFixed(2).replace(".", ",")}
*Pagamento:* Pix
`;

  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}
