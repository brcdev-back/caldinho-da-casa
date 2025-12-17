const numero = "5581991610473";
const chavePix = "81991610473";

const produtos = {
  completo: { preco: 5, qtd: 0, carrinho:0 },
  simples: { preco: 4, qtd: 0, carrinho:0 }
};

/* quantidade do produto */
function alterarQtd(tipo, valor) {
  produtos[tipo].qtd += valor;
  if(produtos[tipo].qtd < 0) produtos[tipo].qtd = 0;
  document.getElementById(`qtd-${tipo}`).innerText = produtos[tipo].qtd;
}

/* atualizar carrinho */
function atualizarCarrinho() {
  const total = produtos.completo.carrinho * produtos.completo.preco + produtos.simples.carrinho * produtos.simples.preco;
  const itens = produtos.completo.carrinho + produtos.simples.carrinho;
  document.getElementById('total-carrinho').innerText = `R$ ${total.toFixed(2).replace(".",",")}`;
  document.getElementById('itens-carrinho').innerText = itens;
}

/* copiar pix */
function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

/* adicionar ao carrinho */
function adicionarCarrinho(tipo) {
  if(produtos[tipo].qtd === 0) { alert("Selecione a quantidade."); return; }
  produtos[tipo].carrinho = produtos[tipo].qtd;
  atualizarCarrinho();
  alert("Produto adicionado ao carrinho!");
}

/* modal */
const modal = document.getElementById("modalPedido");
const resumo = document.getElementById("resumo-pedido");

function abrirModal(tipo) {
  let msg = "";
  if(produtos.completo.carrinho > 0) {
    msg += `Feijão Completo: ${produtos.completo.carrinho}\n`;
  }
  if(produtos.simples.carrinho > 0) {
    msg += `Feijão sem Charque: ${produtos.simples.carrinho}\n`;
  }
  if(!msg) { alert("Carrinho vazio."); return; }

  const total = produtos.completo.carrinho * produtos.completo.preco + produtos.simples.carrinho * produtos.simples.preco;
  msg += `\nTotal: R$ ${total.toFixed(2).replace(".",",")}\nPagamento: Pix`;

  resumo.innerText = msg;
  modal.style.display = "flex";
}

function fecharModal() { modal.style.display = "none"; }

function confirmarPedido() {
  const texto = "PEDIDO – SABOR DE PANELA\n\n" + resumo.innerText;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`);
  fecharModal();
  // limpar carrinho
  produtos.completo.carrinho = 0;
  produtos.simples.carrinho = 0;
  atualizarCarrinho();
}

// fecha modal clicando fora
window.onclick = function(event) { if(event.target == modal) fecharModal(); }
