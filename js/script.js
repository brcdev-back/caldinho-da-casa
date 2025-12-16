const chavePix = "81991610473"; // Mantém a tua chave PIX
const numero = "5581991610473"; // Mantém o teu número de WhatsApp

// Estrutura de produtos mantida, excelente!
const produtos = {
  completo: { nome: "Feijão Completo", preco: 5.00, qtd: 0 },
  simples: { nome: "Feijão Veggie", preco: 4.00, qtd: 0 } // Adicionei o nome para facilitar o pedido
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

    // Atualiza o total individual de cada produto
    document.getElementById(`total-${tipo}`).innerText =
      `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  // Atualiza o total geral no bloco de Checkout
  const totalGeralEl = document.getElementById("total-geral");
  if (totalGeralEl) {
    totalGeralEl.innerText =
      `Total do pedido: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
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
// Esta função não recebe mais 'tipo' ou 'id' porque é o botão final de Checkout
function pedido() {
  
  // 1. LER OS NOVOS CAMPOS DE ENDEREÇO ÚNICO
  const bloco = document.getElementById("bloco-final").value.trim();
  const apto = document.getElementById("apto-final").value.trim();
  const piscina = document.getElementById("piscina-final").checked;

  // 2. VALIDAÇÕES
  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Selecione a quantidade de caldinhos que deseja pedir.");
    return;
  }

  if (!bloco || !apto) {
    alert("Por favor, preencha o Bloco e o Apartamento para a entrega.");
    return;
  }

  // 3. CONSTRUÇÃO DA MENSAGEM
  const local = piscina ? "Piscina / Área de Lazer" : `Apto ${apto}`; // Mais detalhado

  let mensagem =
`*PEDIDO – CALDINHOS DA VOVÓ*
-----------------------------

`;

  let totalFinal = 0;
  
  for (const tipo in produtos) {
      const item = produtos[tipo];
      if (item.qtd > 0) {
          mensagem += `• ${item.nome}: ${item.qtd} unidades\n`;
          totalFinal += item.qtd * item.preco;
      }
  }

  mensagem += `
-----------------------------
*Entrega:*
Bloco: ${bloco}
Local: ${local}

*Total a Pagar:* R$ ${totalFinal.toFixed(2).replace(".", ",")}
*Pagamento:* Pix
`;

  // 4. ABRIR WHATSAPP
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}
