//Lê um arquivo qualquer
//caminhoArquivo é o parâmetro que você deve usar para informar o nome do arquivo.
const loadFile = function (caminhoArquivo, done) {
    var xhr = new XMLHttpRequest()
    xhr.onload = function () { return done(this.responseText) }
    xhr.open("GET", caminhoArquivo, true)
    xhr.send()
  }
  
  //Objeto contendo os dados do usuário que serão carregados do JSON
  let dadosUsuario = {}
  //Objeto contendo os dados dos items que serão carregados do JSON
  let dadosProdutos = {}
  
  //Coleção de items que foram comprados
  let carrinho = []
  
  //Carrega os dados contidos nos arquivos JSON dos items e do usuário
  //JSONFile: Nome do arquivo contendo os dados dos items. Ex: dados.json
  //userFile: Nome do arquivo contendo os dados do usuário. Ex: usuário.json
  //func: Função a ser chamada depois que os dados dos arquivos JSON forem carregados
  //Retorna o valor 1 para indicar que o carregamento foi bem sucedido
  const carregaJSON = function (JSONFile, userFile, func) {
    console.log("Carregando JSON com os items do site ...");
    loadFile(JSONFile, function (responseText) {
      dadosProdutos = JSON.parse(responseText)
      console.log("OK dados produtos")
      console.log("Carregando dados do usuário ...");
      loadFile(userFile, function (responseText) {
        dadosUsuario = JSON.parse(responseText)
        console.log("OK dados usuario")
        func()
        return 1
      })
    })
  }
  
  //A função setup é chamada após os dados do JSON dos items e do usuário terem sido carregadas em seus respectivos objetos. Todas as outras funcionalidades a serem feitas após o carregamento dos arquivos devem estar dentro da função setup.
  //Sem parâmetros
  //Retorna 1  para mostrar que o carregamento foi bem sucedido
  const setup = function(){
    //Chama a função para criar os elementos HTML a partir de um array de items
    criaProdutosNoHTML("containerProdutos", dadosProdutos.items, "Todos os produtos")
    return 1
  }

  const setup2 = function(){
    //Chama a função para criar os elementos HTML a partir de um array de items
    //criaProdutosNoHTML("containerProdutos", dadosProdutos.items, "Todos os produtos")
    return 1
  }
  
  //A função init é chamada automaticamente ao término do carregamento dos elementos do body no HTML
  //Sem parâmetros
  //Sem retorno
  const init = function () {
    carregaJSON("/data/dados.json","/data/usuario.json", setup);
  }

  const inicial = function () {
    carregaJSON("/data/dados.json","/data/usuario.json", setup2);
  }
  //A função comprarItemClick é atribuida a todos os botões "comprar" de todos os items. Para diferenciar qual item está sendo selecionado utilizaremos o ID do próprio botão, que é igual ao ID do produto no JSON ...
  //Sem parâmetros
  //Sem retorno
  const comprarItemClick = function(){
    console.log("Comprando item ", this.id)
    let resultado = dadosProdutos.items.filter(
      produto => produto.id == this.id
    )
    carrinho.push(resultado[0])
    console.log(carrinho)    
  }

  const favoritarItemClick = function(){
    console.log("Favoritar item ", this.id)
    let indice = dadosProdutos.items.findIndex(
      produto => produto.id == this.id
    )
    console.log(index)
    dadosProdutos.items[indice].favorito = !(dadosProdutos.items[indice].favorito)
  }
  
  //A função criaProdutosNoHTML vai gerar, a partir de um array de items, os elementos HTML que apresentam um determinado item (titulo, imagem, descricao, botão de compra)
  //container: String que contém o ID da div no HTML onde os elementos ficarão ancorados
  //dadosProdutos: Array contendo os items a serem apresentados
  //categoria: String contendo o título a ser apresentado na div (na prática é um H1)
  //Sem retorno
  function criaProdutosNoHTML(container, dadosProdutos, categoria) {
    let containerCategoria = document.getElementById(container)
  
    let child = containerCategoria.lastElementChild
    while (child) {
      containerCategoria.removeChild(child)
      child = containerCategoria.lastElementChild
    }
  
    //Cria o título da categoria dentro do container
    let titulo = document.createElement('h1')
    //Substituir pela classe que você criou para o seu título de produto
    titulo['className'] = "SEU CLASSE CSS"
    titulo.textContent = categoria
    containerCategoria.appendChild(titulo)
  
    //Carrega todos os produtos no container (div)
    let containerProdutos = document.getElementById(container)
  
    child = containerProdutos.lastElementChild
    while (child) {
      containerProdutos.removeChild(child)
      child = containerProdutos.lastElementChild
    }
  
    let contador = 0
    //Percorre todos os produtos para criar cada card dos items
    for (let produto of dadosProdutos) {
      if (contador % 3 == 0) {
        var row = document.createElement('div')
        row['className'] = "row align-items-start"
        containerProdutos.appendChild(row);
      }

      //Cria a div card para o produto
      let col = document.createElement('div')
      //Substituir pela classe que você criou para o seu título de produto
      col['className'] = "col"
      row.appendChild(col);

      //Cria a div card para o produto
      let card = document.createElement('div')
      //Substituir pela classe que você criou para o seu título de produto
      card['className'] = "card"
      card['style'] = "width: 18rem;"
      col.appendChild(card);
  
      //cria a imagem dentro da div do card
      let img = document.createElement('img')
      img['src'] = produto.imagem
      img['className'] = "card-img-top"
      img['alt'] = produto.descricao
      card.appendChild(img)

      //Cria a div card para o produto
      let cardBody = document.createElement('div')
      //Substituir pela classe que você criou para o seu título de produto
      cardBody['className'] = "card-body"      
      card.appendChild(cardBody);
  
      //Cria o titulo do produto na div   
      let nH5 = document.createElement('h5');
      nH5['className'] = "card-title"
      nH5.textContent = produto.marca
      cardBody.appendChild(nH5)
  
      //Cria o preco   
      let pTitulo = document.createElement('p')
      pTitulo['className'] = "card-text"
      pTitulo.textContent = produto.descricao
      cardBody.appendChild(pTitulo)

      //Cria o preco   
      let pPreco = document.createElement('p')
      pPreco['className'] = "valor"
      pPreco.textContent = "R$" + produto.valor + ",00"
      cardBody.appendChild(pPreco)

 
      
  
      //cria a imagem dentro da div do card
      let imgComprar = document.createElement('img')
      imgComprar['src'] = "/Imgs/icons8-cesto-de-compras-2-30.png"
      imgComprar['className'] = "card-body"
      imgComprar['alt'] = "comprar"
      imgComprar.onclick = comprarItemClick
      imgComprar['id'] = produto.id
      cardBody.appendChild(imgComprar)


      

      //cria a imagem dentro da div do card
    

        let imgFavoritar = document.createElement('img')
    imgFavoritar['src'] = "/Imgs/fav.png"
    imgFavoritar['className'] = "card-body"
    imgFavoritar['alt'] = "favoritar"
    cardBody.appendChild(imgFavoritar)
  
      contador++
    }
  }

let pesquisar = function (){
  let buscar = document.getElementById ("pesquisa").value

  let resultados = dadosProdutos.items.filter(
    item => item.descricao.toUpperCase().includes (buscar.toUpperCase())
  )
  criaProdutosNoHTML("containerProdutos", resultados, "Busca por:" + buscar)
  return 1
}

const filtroFerramentas = function (){
 let itemFerramenta = dadosProdutos.items.filter(
    item => item.categoria == "Ferramenta"
  )
   criaProdutosNoHTML("containerProdutos", itemFerramenta, "categoria: Ferramenta")
}

const filtroProdutos = function (){
 let itemProdutos = dadosProdutos.items.filter(
    item => item.categoria == "Produtos"
  )
   criaProdutosNoHTML("containerProdutos", itemProdutos, "categoria: Produtos")
}

const favoritar = function() {
  let resultado = dadosProdutos.items.filter(
    items =>(items.favorito == true)
  )
  
  criaProdutosNoHTML("containerProdutos", resultado, "Favorito")
}


const carregaCarrinho = function (){
  let precoCompra = carrinho.reduce(somador, 0)
  document.getElementById("precoCompra").innerHTML =   "R$: " + precoCompra + ",00"
   criaProdutosNoHTML("containerCarrinho", carrinho, "carrinho")
}

const limparClick = function() {
  carrinho = []
  carregaCarrinho()
}


const pesquisar = function(){
  let termoBuscar = document.getElementById("buscar").value
   let resultadoBusca = dadosProdutos.items.filter(
    item => item.descricao == termoBuscar
  )

  console.log(resultadoBusca)
   criaProdutosNoHTML("containerProdutos", resultadoBusca, "busca por:"+termoBuscar)
}


let somador = function (acumulador, produto) {
  return acumulador + produto.valor
}

//favoritos
const Favoritos = function() {
   
  let resultado = dadosProdutos.items.filter(
    items =>(items.favorito == true)
  )
  
  criaProdutosNoHTML("containerProdutos", resultado, "Favorito")
}