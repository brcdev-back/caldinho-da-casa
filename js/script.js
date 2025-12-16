const numero = "5581991610473";

const produtos = {
  completo: { nome: "Feijão Completo", preco: 5, qtd: 0 },
  simples: { nome: "Feijão sem Charque", preco: 4, qtd: 0 }
};

let mensagemFinal = "";

function alterarQtd(tipo, valor) {
  produtos[tipo].qtd += valor;
  if (produtos[tipo].qtd < 0) produtos[tipo].qtd = 0;
  document.getElementById(`qtd-${tipo}`).innerText = produtos[tipo].qtd;
  atualizarTotais();
}

function atualizarTotais() {
  let total = 0;

  for (let tipo in produtos) {
    const subtotal = produtos[tipo].qtd * produtos[tipo].preco;
    total += subtotal;
    document.getElementById(`total-${tipo}`).innerText =
      `Total: R$ ${subtotal.toFixed(2).replace(".", ",")}`;
  }

  document.getElementById("total-geral").innerText =
    `Total do pedido: R$ ${total.toFixed(2).replace(".", ",")}`;
}

function finalizarPedido() {
  if (produtos.completo.qtd === 0 && produtos.simples.qtd === 0) {
    alert("Adicione pelo menos um item.");
    return;
  }

  const bloco = document.getElementById("bloco1").value || document.getElementById("bloco2").value;
  const apto = document.getElementById("apto1").value || document.getElementById("apto2").value;
  const piscina = document.getElementById("piscina1").checked || document.getElementById("piscina2").checked;

  if (!bloco || !apto) {
    alert("Informe bloco e apartamento.");
    return;
  }

  let resumo = "";
  let total = 0;

  for (let tipo in produtos) {
    if (produtos[tipo].qtd > 0) {
      resumo += `• ${produtos[tipo].nome}: ${produtos[tipo].qtd}x<br>`;
      total += produtos[tipo].qtd * produtos[tipo].preco;
    }
  }

  resumo += `<br>Bloco: ${bloco}<br>Apto: ${apto}<br>Entrega: ${piscina ? "Piscina" : "Apartamento"}<br><br>Total: R$ ${total.toFixed(2).replace(".", ",")}`;

  mensagemFinal =
`PEDIDO - CALDINHO DE FEIJÃO

${resumo.replace(/<br>/g, "\n")}

Pagamento: Pix`;

  document.getElementById("resumo-pedido").innerHTML = resumo;
  document.getElementById("confirmacao").style.display = "flex";
}

function fecharConfirmacao() {
  document.getElementById("confirmacao").style.display = "none";
}

function enviarPedido() {
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagemFinal)}`, "_blank");
  fecharConfirmacao();
}
