const chavePix = "81991610473";
const nomePix = "Caldinho de Feijão";
const numero = "5581991610473";

const produtos = {
  completo: { nome: "Feijão Completo", preco: 5.00, qtd: 0 },
  simples: { nome: "Feijão sem Charque", preco: 4.00, qtd: 0 }
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

function copiarPix() {
  navigator.clipboard.writeText(`${chavePix} - ${nomePix}`);
  alert("Chave Pix copiada!");
}

function finalizarPedido() {
  let mensagem = "PEDIDO - CALDINHO DE FEIJÃO\n\n";
  let totalGeral = 0;

  // Verifica se tem item
  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Adicione pelo menos um produto ao pedido.");
    return;
  }

  // Endereço (usa o primeiro preenchido)
  const bloco = document.getElementById("bloco1").value || document.getElementById("bloco2").value;
  const apto = document.getElementById("apto1").value || document.getElementById("apto2").value;
  const piscina = document.getElementById("piscina1").checked || document.getElementById("piscina2").checked;

  if (!bloco || !apto) {
    alert("Informe bloco e apartamento.");
    return;
  }

  for (let tipo in produtos) {
    if (produtos[tipo].qtd > 0) {
      const subtotal = produtos[tipo].qtd * produtos[tipo].preco;
      totalGeral += subtotal;

      mensagem += `• ${produtos[tipo].nome}: ${produtos[tipo].qtd}x\n`;
    }
  }

  mensagem += `
------------------
Total: R$ ${totalGeral.toFixed(2).replace(".", ",")}

Bloco: ${bloco}
Apartamento: ${apto}
Entrega: ${piscina ? "Piscina" : "Apartamento"}

Pagamento: Pix
`;

  window.open(
    `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
}
