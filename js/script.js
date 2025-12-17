const numero = "5581991610473";
const chavePix = "81991610473";

const produtos = {
  completo: { preco: 5, qtd: 0, carrinho: 0 },
  simples: { preco: 4, qtd: 0, carrinho: 0 }
};

// Alterar quantidade do card
function alterarQtd(tipo, valor) {
  produtos[tipo].qtd += valor;
  if (produtos[tipo].qtd < 0) produtos[tipo].qtd = 0;
  document.getElementById(`qtd-${tipo}`).innerText = produtos[tipo].qtd;
}

// Adicionar ao carrinho
function adicionarCarrinho(tipo) {
  if (produtos[tipo].qtd === 0) {
    alert("Selecione a quantidade.");
    return;
  }

  // Salvar informações do cliente no produto
  produtos[tipo].bloco = document.getElementById(`bloco-${tipo}`).value || "Não informado";
  produtos[tipo].apartamento = document.getElementById(`apartamento-${tipo}`).value || "Não informado";
  produtos[tipo].piscina = document.getElementById(`piscina-${tipo}`).checked ? "Sim" : "Não";

  produtos[tipo].carrinho += produtos[tipo].qtd; // incrementa no carrinho
  produtos[tipo].qtd = 0; // reseta card
  document.getElementById(`qtd-${tipo}`).innerText = 0;
  atualizarCarrinho();
  alert("Produto adicionado ao carrinho!");
}

// Atualizar total do carrinho
function atualizarCarrinho() {
  const total = produtos.completo.carrinho * produtos.completo.preco +
                produtos.simples.carrinho * produtos.simples.preco;
  const itens = produtos.completo.carrinho + produtos.simples.carrinho;
  document.getElementById('total-carrinho').innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;
  document.getElementById('itens-carrinho').innerText = itens;
}

// Copiar Pix
function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

// Abrir modal com resumo do carrinho
const modal = document.getElementById("modalPedido");
const resumo = document.getElementById("resumo-pedido");

function abrirModal() {
  let msg = "";

  if (produtos.completo.carrinho > 0) {
    msg += `Feijão Completo: ${produtos.completo.carrinho}\nBloco: ${produtos.completo.bloco}\nApartamento: ${produtos.completo.apartamento}\nPiscina: ${produtos.completo.piscina}\n\n`;
  }
  if (produtos.simples.carrinho > 0) {
    msg += `Feijão sem Charque: ${produtos.simples.carrinho}\nBloco: ${produtos.simples.bloco}\nApartamento: ${produtos.simples.apartamento}\nPiscina: ${produtos.simples.piscina}\n\n`;
  }

  if (!msg) { alert("Carrinho vazio."); return; }

  const total = produtos.completo.carrinho * produtos.completo.preco +
                produtos.simples.carrinho * produtos.simples.preco;
  msg += `Total: R$ ${total.toFixed(2).replace(".", ",")}\nPagamento: Pix`;

  resumo.innerText = msg;
  modal.style.display = "flex";
}

// Fechar modal
function fecharModal() { modal.style.display = "none"; }

// Confirmar pedido
function confirmarPedido() {
  const texto = "PEDIDO – SABOR DE PANELA\n\n" + resumo.innerText;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`);
  fecharModal();

  // Limpar carrinho
  produtos.completo.carrinho = 0;
  produtos.simples.carrinho = 0;
  produtos.completo.bloco = "";
  produtos.simples.bloco = "";
  produtos.completo.apartamento = "";
  produtos.simples.apartamento = "";
  produtos.completo.piscina = "";
  produtos.simples.piscina = "";
  atualizarCarrinho();
}

// Fechar modal clicando fora
window.onclick = function(event) {
  if (event.target == modal) fecharModal();
}
