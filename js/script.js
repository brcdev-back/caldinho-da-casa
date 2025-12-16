const chavePix = "81991610473"; // TUA CHAVE PIX
const numero = "5581991610473"; // TEU NÚMERO DE WHATSAPP (Ex: 5511999998888)

const produtos = {
  completo: { nome: "Feijão Completo (Com Charque)", preco: 5.00, qtd: 0 },
  simples: { nome: "Feijão Simples (Veggie)", preco: 4.00, qtd: 0 }
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
      `Total do teu Pedido: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
  }
}

// Inicializa os totais ao carregar a página
atualizarTotais(); 


// ================= PIX =================
function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada! Envie o comprovativo no WhatsApp após finalizar o pedido.");
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
          mensagemDetalhes += `• ${item.nome} x ${item.qtd} (R$ ${(item.qtd * item.preco).toFixed(2).replace(".", ",")})\n`;
          totalFinal += item.qtd * item.preco;
          itensPedidos++;
      }
  }

  // 2. VALIDAÇÕES
  if (itensPedidos === 0) {
    alert("Por favor, adicione ao menos um caldinho ao teu pedido.");
    return;
  }

  if (!bloco || !apto) {
    alert("Preencha o Bloco e o Apartamento para a entrega.");
    return;
  }

  // 3. MONTAGEM FINAL DA MENSAGEM
  const local = piscina ? "Piscina / Área de Lazer" : `Apartamento ${apto}`;
  
  let mensagem =
`*PEDIDO - SABOR NA PANELA*
-----------------------------

*Itens:*
${mensagemDetalhes}
-----------------------------
*Entrega:*
Bloco: ${bloco}
Local: ${local}

*TOTAL FINAL:* R$ ${totalFinal.toFixed(2).replace(".", ",")}
*Pagamento:* PIX

Obrigado!
`;

  // 4. ABRIR WHATSAPP
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}
