const chavePix = "81991610473"; // TUA CHAVE PIX
const numero = "5581991610473"; // TEU NÚMERO DE WHATSAPP

// Estrutura de produtos aprimorada com o nome completo
const produtos = {
  completo: { nome: "Feijão Completo", preco: 5.00, qtd: 0 },
  simples: { nome: "Feijão Veggie", preco: 4.00, qtd: 0 }
};

// ================= QUANTIDADE =================
function alterarQtd(tipo, valor) {
  productos[tipo].qtd += valor;

  if (productos[tipo].qtd < 0) {
    productos[tipo].qtd = 0;
  }

  document.getElementById(`qtd-${tipo}`).innerText = productos[tipo].qtd;
  atualizarTotais();
}

// ================= TOTAIS =================
function atualizarTotais() {
  let totalGeral = 0;

  for (let tipo in produtos) {
    const total = produtos[tipo].qtd * produtos[tipo].preco;
    totalGeral += total;

    // Atualiza o total individual
    document.getElementById(`total-${tipo}`).innerText =
      `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  // Atualiza o total geral
  const totalGeralEl = document.getElementById("total-geral");
  if (totalGeralEl) {
    totalGeralEl.innerText =
      `Total do teu Pedido: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
  }
}

// Inicializa os totais ao carregar a página
atualizarTotais(); 


// ================= PIX =================
function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada! Envia o comprovativo após finalizar o pedido no WhatsApp.");
}

// ================= PEDIDO (FINAL) =================
function pedido() {
  
  const bloco = document.getElementById("bloco-final").value.trim();
  const apto = document.getElementById("apto-final").value.trim();
  const piscina = document.getElementById("piscina-final").checked;
  
  let totalFinal = 0;
  let itensPedidos = 0;
  
  // 1. CONSTRUÇÃO DA MENSAGEM e CÁLCULO FINAL
  let mensagemDetalhes = '';
  for (const tipo in produtos) {
      const item = produtos[tipo];
      if (item.qtd > 0) {
          mensagemDetalhes += `• ${item.nome}: ${item.qtd} unidade(s)\n`;
          totalFinal += item.qtd * item.preco;
          itensPedidos++;
      }
  }

  // 2. VALIDAÇÕES
  if (itensPedidos === 0) {
    alert("Selecione a quantidade de caldinhos que desejas pedir.");
    return;
  }

  if (!bloco || !apto) {
    alert("Por favor, preencha o Bloco e o Apartamento para a entrega.");
    return;
  }

  // 3. MONTAGEM FINAL DA MENSAGEM
  const local = piscina ? "Piscina / Área de Lazer" : `Apartamento ${apto}`;
  
  let mensagem =
`*NOVO PEDIDO – CALDINHOS GOURMET*
-----------------------------

*Itens:*
${mensagemDetalhes}
-----------------------------
*Dados da Entrega:*
Bloco: ${bloco}
Local: ${local}

*TOTAL A PAGAR:* R$ ${totalFinal.toFixed(2).replace(".", ",")}
*Pagamento:* PIX

Obrigado!
`;

  // 4. ABRIR WHATSAPP
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}
