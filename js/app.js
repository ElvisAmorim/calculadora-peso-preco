// Selecionando os elementos do DOM
const inputPesoVolume = document.getElementById("pesoVolume");
const inputPreco = document.getElementById("preco");
const botaoAdicionar = document.getElementById("adicionarProduto");
const listaProdutos = document.getElementById("listaProdutos");
const resultadoFinal = document.getElementById("resultadoFinal");
const textoVencedor = document.getElementById("textoVencedor");
const botaoNovoCalculo = document.getElementById("novoCalculo");

// Array para armazenar os produtos adicionados
let produtos = [];

function adicionarProduto() {
  const nome = parseFloat(inputPesoVolume.value);
  const pesoVolume = parseFloat(inputPesoVolume.value);
  const preco = parseFloat(inputPreco.value);

  // Validação básica
  if (isNaN(pesoVolume) || isNaN(preco) || pesoVolume <= 0 || preco <= 0) {
    alert("Por favor, informe valores válidos para peso/volume e preço.");
    return;
  }

  // Calculando preço por unidade (g ou ml)
  const precoPorUnidade = preco / pesoVolume;

  // Criar objeto do produto
  const produto = {
    // id: produtos.length + 1, // gerar ID simples -- removido para melhor entendimento do usuario
    nome,
    pesoVolume,
    preco,
    precoPorUnidade,
  };

  // Adicionar no array
  produtos.push(produto);

  // Atualizar a lista de produtos na tela
  atualizarListaProdutos();

  // Limpar os campos
  inputPesoVolume.value = "";
  inputPreco.value = "";
  inputPesoVolume.focus();
}

function atualizarListaProdutos() {
  // Limpar os produtos exibidos
  listaProdutos.innerHTML = "";

  // Percorrer o array de produtos e criar os cards
  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
    <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
        <h5 class="card-title pb-2">Produto de ${produto.nome} g/ml</h5>
        <p class="card-text">Preço: <strong>R$ ${produto.preco.toFixed(2)}</strong></p>
        <p class="card-text">Preço por grama/ml: <strong>R$ ${produto.precoPorUnidade.toFixed(2)}</strong></p>
        </div>
    </div>
    `;

    listaProdutos.appendChild(card);
  });

  // Depois de atualizar, se tiver 2 ou mais produtos, calcular o vencedor
  if (produtos.length >= 2) {
    calcularVencedor();};
};


function calcularVencedor() {
    // Encontrar o produto com o menor preço por unidade
    let vencedor = produtos[0];
  
    produtos.forEach(produto => {
      if (produto.precoPorUnidade < vencedor.precoPorUnidade) {
        vencedor = produto;
      }
    });
  
    // Mostrar o resultado
    // textoVencedor.innerText = `Produto de${vencedor.id} com ${vencedor.pesoVolume}g/ml por R$${vencedor.preco.toFixed(2)} é o mais vantajoso.`;
    textoVencedor.innerText = `
      Produto de ${vencedor.nome}g/ml por R$${vencedor.preco.toFixed(2)} é o mais vantajoso.
      `;
    resultadoFinal.style.display = 'block';
};

botaoAdicionar.addEventListener('click', adicionarProduto);

botaoNovoCalculo.addEventListener('click', function() {
    produtos = [];
    listaProdutos.innerHTML = '';
    resultadoFinal.style.display = 'none';
    inputPesoVolume.value = '';
    inputPreco.value = '';
    inputPesoVolume.focus();
});