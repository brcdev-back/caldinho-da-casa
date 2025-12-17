const numero = "5581991610473";
const chavePix = "81991610473";

const produtos = {
  completo: { nome: "Feijão Completo", preco: 5, qtd: 0 },
  simples: { nome: "Feijão sem Charque", preco: 4, qtd: 0 }
};

let pedidos = [];
let historicoPedidos = [];

// ======== FUNÇÕES DE CARRINHO ========
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
    document.getElementById(`total-${tipo}`).innerText =
      `Subtotal: R$ ${total.toFixed(2).replace(".", ",")}`;
    totalGeral += total;
  }
  document.getElementById("total-geral").innerText =
    `Total Geral: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
}

function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

// ======== FINALIZAR PEDIDO ========
function finalizarPedido() {
  const bloco = document.getElementById("bloco").value;
  const apto = document.getElementById("apto").value;
  const piscina = document.getElementById("piscina").checked;

  if (!bloco || !apto) {
    alert("Informe bloco e apartamento.");
    return;
  }

  let msg = "PEDIDO – CALDINHO DE FEIJÃO\n\n";
  let temProduto = false;
  let total = 0;

  for (let tipo in produtos) {
    if (produtos[tipo].qtd > 0) {
      temProduto = true;
      const subtotal = produtos[tipo].qtd * produtos[tipo].preco;
      total += subtotal;
      msg += `• ${produtos[tipo].nome}\nQtd: ${produtos[tipo].qtd} | R$ ${subtotal.toFixed(2).replace(".", ",")}\n\n`;
    }
  }

  if (!temProduto) {
    alert("Selecione ao menos um produto.");
    return;
  }

  msg += `Total Geral: R$ ${total.toFixed(2).replace(".", ",")}\nBloco: ${bloco}\nApartamento: ${apto}\nEntrega: ${piscina ? "Piscina" : "Apartamento"}\nPagamento: Pix`;

  const pedidoObj = { text: msg, entregue: false };
  pedidos.push(pedidoObj);
  historicoPedidos.push(pedidoObj);

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);

  for (let tipo in produtos) produtos[tipo].qtd = 0;
  atualizarTotais();
  atualizarPainel();
  atualizarHistorico();
}

// ======== MODAL ADMIN ========
function abrirLogin() { document.getElementById("adminModal").style.display = "flex"; }
function fecharLogin() { document.getElementById("adminModal").style.display = "none"; }

function loginAdmin() {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  if (user === "admin" && pass === "1234") {
    alert("Login realizado com sucesso!");
    fecharLogin();
    abrirPainel();
  } else alert("Usuário ou senha incorretos!");
}

// ======== PAINEL ADMIN ========
function abrirPainel() {
  document.getElementById("painelPedidos").style.display = "flex";
  atualizarPainel();
  atualizarHistorico();
}

function fecharPainel() { document.getElementById("painelPedidos").style.display = "none"; }

function limparPedidos() {
  if (confirm("Deseja realmente limpar todos os pedidos?")) {
    pedidos = [];
    atualizarPainel();
  }
}

function marcarEntregue(index) {
  pedidos[index].entregue = true;
  atualizarPainel();
}

// ======== ATUALIZAR PAINEL E HISTÓRICO ========
function atualizarPainel() {
  const lista = document.getElementById("listaPedidos");
  const totalSpan = document.getElementById("contadorTotal");
  const entreguesSpan = document.getElementById("contadorEntregues");
  lista.innerHTML = "";
  totalSpan.innerText = pedidos.length;
  entreguesSpan.innerText = pedidos.filter(p => p.entregue).length;

  if (pedidos.length === 0) { lista.innerHTML = "<p>Nenhum pedido até o momento.</p>"; return; }

  pedidos.forEach((p,i)=>{
    const div = document.createElement("div");
    div.style.borderBottom="1px solid #ddd";
    div.style.padding="8px 0";
    div.style.background=p.entregue?"#d4edda":"#fff";
    div.innerHTML=`<strong>Pedido ${i+1}</strong><br>${p.text.replace(/\n/g,"<br>")}<br>
      <button onclick="marcarEntregue(${i})" style="
        margin-top:5px;padding:6px 10px;border:none;border-radius:5px;
        background:${p.entregue?'#6c757d':'#28a745'};
        color:#fff;cursor:pointer;font-size:13px;">${p.entregue?'Entregue':'Marcar como Entregue'}</button>`;
    lista.appendChild(div);
  });
}

function atualizarHistorico() {
  const lista = document.getElementById("listaHistorico");
  lista.innerHTML = "";
  if(historicoPedidos.length===0){ lista.innerHTML="<p>Nenhum pedido histórico ainda.</p>"; return; }
  historicoPedidos.forEach((p,i)=>{
    const div = document.createElement("div");
    div.style.background = p.entregue ? "#d4edda" : "#fff";
    div.style.padding = "6px 0";
    div.style.borderBottom="1px solid #ddd";
    div.innerHTML=`<strong>Pedido ${i+1}</strong><br>${p.text.replace(/\n/g,"<br>")}`;
    lista.appendChild(div);
  });
}
