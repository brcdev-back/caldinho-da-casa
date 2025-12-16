let mensagemFinal = "";

function finalizarPedido() {
  let resumo = "";
  let total = 0;

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

  resumo += "<strong>Itens:</strong><br>";

  if (produtos.completo.qtd > 0) {
    const subt = produtos.completo.qtd * produtos.completo.preco;
    total += subt;
    resumo += `• Feijão Completo: ${produtos.completo.qtd}x<br>`;
  }

  if (produtos.simples.qtd > 0) {
    const subt = produtos.simples.qtd * produtos.simples.preco;
    total += subt;
    resumo += `• Feijão sem Charque: ${produtos.simples.qtd}x<br>`;
  }

  resumo += `
    <br><strong>Endereço:</strong><br>
    Bloco: ${bloco}<br>
    Apartamento: ${apto}<br>
    Entrega: ${piscina ? "Piscina" : "Apartamento"}<br><br>
    <strong>Total:</strong> R$ ${total.toFixed(2).replace(".", ",")}
  `;

  mensagemFinal =
`PEDIDO - CALDINHO DE FEIJÃO

${produtos.completo.qtd > 0 ? `• Feijão Completo: ${produtos.completo.qtd}\n` : ""}
${produtos.simples.qtd > 0 ? `• Feijão sem Charque: ${produtos.simples.qtd}\n` : ""}

Bloco: ${bloco}
Apartamento: ${apto}
Entrega: ${piscina ? "Piscina" : "Apartamento"}

Total: R$ ${total.toFixed(2).replace(".", ",")}
Pagamento: Pix`;

  document.getElementById("resumo-pedido").innerHTML = resumo;
  document.getElementById("confirmacao").style.display = "flex";
}

function fecharConfirmacao() {
  document.getElementById("confirmacao").style.display = "none";
}

function enviarPedido() {
  window.open(
    `https://wa.me/5581991610473?text=${encodeURIComponent(mensagemFinal)}`,
    "_blank"
  );
  fecharConfirmacao();
}
