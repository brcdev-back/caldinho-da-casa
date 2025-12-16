const numero = "5581991610473";
const chavePix = "81991610473";
const nomePix = "Bernardo Rodrigues de Carvalho";

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
      `Total: R$ ${subtotal.toFixed(2).replace(".", ",")}`;
  }

  document.getElementById("total-geral").innerText =
    `Total do pedido: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
}

function finalizarPedido() {
  const bloco = document.getElementById("bloco").value;
  const apto = document.getElementById("apto").value;
  const piscina = document.getElementById("piscina").checked;

  if (!bloco || !apto) {
    alert("Informe bloco e apartamento.");
    return;
  }

  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Adicione pelo menos um produto.");
    return;
  }

  let mensagem = "PEDIDO - CALDINHO DE FEIJÃO\n\n";
  let total = 0;

  for (let tipo in produtos) {
    if (produtos[tipo].qtd > 0) {
      const subtotal = produtos[tipo].qtd * produtos[tipo].preco;
      total += subtotal;

      mensagem += `• ${produtos[tipo].nome}: ${produtos[tipo].qtd}x\n`;
    }
  }

  mensagem += `
-----------------------
Total: R$ ${total.toFixed(2).replace(".", ",")}

Bloco: ${bloco}
Apartamento: ${apto}
Entrega: ${piscina ? "Piscina" : "Apartamento"}

Pagamento: Pix
Chave: ${chavePix}
Nome: ${nomePix}
`;

  window.open(
    `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
}
