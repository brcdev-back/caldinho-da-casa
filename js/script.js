const numero = "5581991610473";
const chavePix = "81991610473";

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
    const total = produtos[tipo].qtd * produtos[tipo].preco;
    document.getElementById(`total-${tipo}`).innerText =
      `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
    totalGeral += total;
  }

  document.getElementById("total-geral").innerText =
    `Total Geral: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
}

function copiarPix() {
  navigator.clipboard.writeText(chavePix);
  alert("Chave Pix copiada!");
}

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

  msg +=
`Total Geral: R$ ${total.toFixed(2).replace(".", ",")}

Bloco: ${bloco}
Apartamento: ${apto}
Entrega: ${piscina ? "Piscina" : "Apartamento"}
Pagamento: Pix`;

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);
}

const admin = {
  user: "admin",
  pass: "1234"
};

function abrirLogin() {
  document.getElementById("adminModal").style.display = "flex";
}

function fecharLogin() {
  document.getElementById("adminModal").style.display = "none";
}

function loginAdmin() {
  const u = document.getElementById("adminUser").value;
  const p = document.getElementById("adminPass").value;

  if (u === admin.user && p === admin.pass) {
    alert("Login admin realizado com sucesso!");
    fecharLogin();
    // futuro: ativar modo admin
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

let pedidos = []; // lista de pedidos do dia

function loginAdmin() {
  const u = document.getElementById("adminUser").value;
  const p = document.getElementById("adminPass").value;

  if (u === admin.user && p === admin.pass) {
    alert("Login admin realizado com sucesso!");
    fecharLogin();
    abrirPainel();
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

function abrirPainel() {
  document.getElementById("painelPedidos").style.display = "flex";
  atualizarPainel();
}

function fecharPainel() {
  document.getElementById("painelPedidos").style.display = "none";
}

function limparPedidos() {
  if (confirm("Deseja realmente limpar todos os pedidos?")) {
    pedidos = [];
    atualizarPainel();
  }
}

function atualizarPainel() {
  const lista = document.getElementById("listaPedidos");
  const totalSpan = document.getElementById("contadorTotal");
  const entreguesSpan = document.getElementById("contadorEntregues");

  lista.innerHTML = "";
  let totalPedidos = pedidos.length;
  let totalEntregues = pedidos.filter(p => p.entregue).length;

  totalSpan.innerText = totalPedidos;
  entreguesSpan.innerText = totalEntregues;

  if (totalPedidos === 0) {
    lista.innerHTML = "<p>Nenhum pedido até o momento.</p>";
    return;
  }

  pedidos.forEach((p, i) => {
    const div = document.createElement("div");
    div.style.borderBottom = "1px solid #ddd";
    div.style.padding = "8px 0";
    div.style.marginBottom = "5px";
    div.style.background = p.entregue ? "#d4edda" : "#fff";
    div.style.transition = "0.3s";

    div.innerHTML = `
      <strong>Pedido ${i + 1}</strong><br>${p.text.replace(/\n/g, "<br>")}
      <br>
      <button onclick="marcarEntregue(${i})" style="
        margin-top: 5px;
        padding: 6px 10px;
        border: none;
        border-radius: 5px;
        background: ${p.entregue ? '#6c757d' : '#28a745'};
        color: #fff;
        cursor: pointer;
        font-size: 13px;
      ">${p.entregue ? 'Entregue' : 'Marcar como Entregue'}</button>
    `;
    lista.appendChild(div);
  });
}
}

function limparPedidos() {
  if (confirm("Deseja realmente limpar todos os pedidos?")) {
    pedidos = [];
    atualizarPainel();
  }
}

// 🔥 MODIFICAÇÃO NA FUNÇÃO FINALIZAR PEDIDO
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

  msg +=
`Total Geral: R$ ${total.toFixed(2).replace(".", ",")}

Bloco: ${bloco}
Apartamento: ${apto}
Entrega: ${piscina ? "Piscina" : "Apartamento"}
Pagamento: Pix`;

  // adiciona no painel admin
  pedidos.push(msg);

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);

  // reseta carrinho
  for (let tipo in produtos) produtos[tipo].qtd = 0;
  atualizarTotais();
}

function atualizarTotais() {
  let totalGeral = 0;

  for (let tipo in produtos) {
    const total = produtos[tipo].qtd * produtos[tipo].preco;
    document.getElementById(`total-${tipo}`).innerText =
      `Subtotal: R$ ${total.toFixed(2).replace(".", ",")}`;
    totalGeral += total;

    // Feedback visual simples: piscando quando altera
    const elem = document.getElementById(`total-${tipo}`);
    elem.style.transition = "0.3s";
    elem.style.background = "#e0ffe0";
    setTimeout(() => { elem.style.background = "transparent"; }, 300);
  }

  const totalElem = document.getElementById("total-geral");
  totalElem.innerText = `Total Geral: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
  totalElem.style.transition = "0.3s";
  totalElem.style.background = "#fff3e0";
  setTimeout(() => { totalElem.style.background = "transparent"; }, 300);
}

// Modifica a função atualizarPainel para incluir botão Entregue
function atualizarPainel() {
  const lista = document.getElementById("listaPedidos");
  lista.innerHTML = "";

  if (pedidos.length === 0) {
    lista.innerHTML = "<p>Nenhum pedido até o momento.</p>";
    return;
  }

  pedidos.forEach((p, i) => {
    const div = document.createElement("div");
    div.style.borderBottom = "1px solid #ddd";
    div.style.padding = "8px 0";
    div.style.transition = "0.3s";
    
    // cor do pedido conforme status
    div.style.background = p.entregue ? "#d4edda" : "#fff";

    div.innerHTML = `
      <strong>Pedido ${i + 1}</strong><br>${p.text.replace(/\n/g, "<br>")}
      <br><button onclick="marcarEntregue(${i})" style="
        margin-top: 5px;
        padding: 6px 10px;
        border: none;
        border-radius: 5px;
        background: ${p.entregue ? '#6c757d' : '#28a745'};
        color: #fff;
        cursor: pointer;
        font-size: 13px;
      ">${p.entregue ? 'Entregue' : 'Marcar como Entregue'}</button>
    `;
    lista.appendChild(div);
  });
}

// marcar pedido como entregue
function marcarEntregue(index) {
  pedidos[index].entregue = true;
  atualizarPainel();
}

// Modificar função finalizarPedido para salvar pedido como objeto
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

  msg +=
`Total Geral: R$ ${total.toFixed(2).replace(".", ",")}

Bloco: ${bloco}
Apartamento: ${apto}
Entrega: ${piscina ? "Piscina" : "Apartamento"}
Pagamento: Pix`;

  // adiciona no painel admin como objeto com status
  pedidos.push({ text: msg, entregue: false });

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);

  // reseta carrinho
  for (let tipo in produtos) produtos[tipo].qtd = 0;
  atualizarTotais();
}

