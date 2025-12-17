const numero = "5581991610473";
const chavePix = "81991610473";

const produtos = {
  completo: { preco: 5, qtd: 0 },
  simples: { preco: 4, qtd: 0 }
};

function alterarQtd(tipo, valor) {
  produtos[tipo].qtd += valor;
  if (produtos[tipo].qtd < 0) produtos[tipo].qtd = 0;
  document.getElementById(`qtd-${tipo}`).innerText = produtos[tipo].qtd;
  atualizarTotais();
}

function atualizarTotais() {
  const totalCompleto = produtos.completo.qtd * produtos.completo.preco;
  const totalSimples = produtos.simples.qtd * produtos.simples.preco;
  document.getElementById("total-completo").innerText = `Total: R$ ${totalCompleto.toFixed(2).replace(".", ",")}`;
  document.getElementById("total-simples").innerText = `Total: R$ ${totalSimples.toFixed(2).replace(".", ",")}`;
  document.getElementById("total-geral").innerText = `R$ ${(totalCompleto + totalSimples).toFixed(2).replace(".", ",")}`;
}

function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

/* Modal */
const modal = document.getElementById("modalPedido");
const resumo = document.getElementById("resumo-pedido");

function abrirModal(tipo) {
  let msg = "";

  // Produto Completo
  if ((tipo === "completo" || tipo === "geral") && produtos.completo.qtd > 0) {
    const bloco = document.getElementById("bloco1").value;
    const apto = document.getElementById("apto1").value;
    const piscina = document.getElementById("piscina1").checked ? "Piscina" : "Apartamento";
    if (!bloco || !apto) { alert("Informe bloco e apartamento do Feijão Completo."); return; }
    msg += `Feijão Completo: ${produtos.completo.qtd}\nBloco: ${bloco}\nApartamento: ${apto}\nEntrega: ${piscina}\n\n`;
  }

  // Produto Simples
  if ((tipo === "simples" || tipo === "geral") && produtos.simples.qtd > 0) {
    const bloco = document.getElementById("bloco2").value;
    const apto = document.getElementById("apto2").value;
    const piscina = document.getElementById("piscina2").checked ? "Piscina" : "Apartamento";
    if (!bloco || !apto) { alert("Informe bloco e apartamento do Feijão sem Charque."); return; }
    msg += `Feijão sem Charque: ${produtos.simples.qtd}\nBloco: ${bloco}\nApartamento: ${apto}\nEntrega: ${piscina}\n\n`;
  }

  if (!msg) { alert("Selecione ao menos um produto."); return; }

  resumo.innerText = msg;
  modal.style.display = "flex";
}

function fecharModal() { modal.style.display = "none"; }

function confirmarPedido() {
  let msg = "PEDIDO – SABOR DE PANELA\n\n" + resumo.innerText;
  msg += `Total Geral: ${document.getElementById("total-geral").innerText}\nPagamento: Pix`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);
  fecharModal();
}

// Fecha modal clicando fora
window.onclick = function(event) {
  if (event.target == modal) fecharModal();
}
