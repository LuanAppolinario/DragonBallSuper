/* Json com as informações e imagens dos 12 personagens */
var personagens = [
        {nome:"Android", imagem:"Imagens/personagens/android17.png", imgLuta:"Imagens/luta/android17-luta.png", imgVitoria: "Imagens/vitoria/android17.png", imgDerrota: "Imagens/derrota/android17.png", power: "89"},
        {nome:"Bills", imagem: "Imagens/personagens/bills.png", imgLuta:"Imagens/luta/bills-luta.png", imgVitoria: "Imagens/vitoria/bills.png", imgDerrota: "Imagens/derrota/bills.png", power: "100"},
        {nome:"Brolly", imagem: "Imagens/personagens/broly.png", imgLuta:"Imagens/luta/broly-luta.png" , imgVitoria: "Imagens/vitoria/broly.png", imgDerrota: "Imagens/derrota/broly.png",power: "98"},
        {nome:"Dispo", imagem: "Imagens/personagens/dispo.png", imgLuta:"Imagens/luta/dispo-luta.png", imgVitoria: "Imagens/vitoria/dispo.png", imgDerrota: "Imagens/derrota/dispo.png", power: "75"},
        {nome:"Freeza", imagem: "Imagens/personagens/freeza.png", imgLuta:"Imagens/luta/freeza-luta.png", imgVitoria: "Imagens/vitoria/freeza.png", imgDerrota: "Imagens/derrota/freeza.png", power: "95"},
        {nome:"Gohan", imagem:"Imagens/personagens/gohan.png", imgLuta:"Imagens/luta/gohan-luta.png", imgVitoria: "Imagens/vitoria/gohan.png", imgDerrota: "Imagens/derrota/gohan.png", power: "70"},
        {nome:"Goku", imagem: "Imagens/personagens/goku.png", imgLuta:"Imagens/luta/goku-luta.png", imgVitoria: "Imagens/vitoria/goku.png", imgDerrota: "Imagens/derrota/goku.png", power: "101"},
        {nome:"Goku Black", imagem: "Imagens/personagens/gokuBlack.png", imgLuta:"Imagens/luta/gokuBlack-luta.png", imgVitoria: "Imagens/vitoria/gokuBlack.png", imgDerrota: "Imagens/derrota/gokuBlack.png", power: "96"},
        {nome:"Jiren", imagem: "Imagens/personagens/jiren.png", imgLuta:"Imagens/luta/jiren-luta.png", imgVitoria: "Imagens/vitoria/jiren.png", imgDerrota: "Imagens/derrota/jiren.png", power: "110"},
        {nome:"Toppo", imagem: "Imagens/personagens/toppo.png", imgLuta:"Imagens/luta/toppo-luta.png", imgVitoria: "Imagens/vitoria/toppo.png", imgDerrota: "Imagens/derrota/toppo.png", power: "102"},
        {nome:"Vegeta", imagem: "Imagens/personagens/vegeta.png", imgLuta:"Imagens/luta/vegeta-luta.png", imgVitoria: "Imagens/vitoria/vegeta.png", imgDerrota: "Imagens/derrota/vegeta.png", power: "94"},
        {nome:"Zamasu", imagem: "Imagens/personagens/zamasu.png", imgLuta:"Imagens/luta/zamasu-luta.png", imgVitoria: "Imagens/vitoria/zamasu.png", imgDerrota: "Imagens/derrota/zamasu.png", power: "90"}
];

/* declarando as variaveis e pegando os elementos */
var player = "";
var poderPlayer = "";
var com = "";
var poderCom = "";
var bg = document.querySelector('.bg');
var imgPlayer = document.getElementById("luta-player");
var imgInimigo = document.getElementById("luta-inimigo");
var textPlayer = document.getElementById('player-text');
var textInimigo = document.getElementById('inimigo-text');
var fundo_luta = document.getElementById('fundo');
var res = document.querySelector('.result');
var res_text = document.querySelector('.res-text');

/*gera um numero aleatorio pra escolher o inimigo*/
function selecionaInimigo(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
}

/* cria 2 contadores para colocar nos atributos opt das tags img e p
não da pra colocar 1 contador só porque quando o usuario clicar no texto e não na imagem ele
conta como clique diferente */
var cont = "0";
var cont2 = "0";
/*esses contadores vão rodar em cada map e adicionar um numero de 0 a 11 para
cada personagem pegar o clique do usuario no personagem*/

/* pega a personagensBoxes e adiciona todos os personagens que tem no Json*/
var personagensBoxes = document.querySelector('.personagens-boxes');
personagens.map(function(val){
    personagensBoxes.innerHTML+=`
                    <div class="personagens-box">
                        <img opt="`+ cont++ +`" src="`+val.imagem+`" />
                        <p opt="`+ cont2++ +`">`+val.nome+`</p>
                    </div>`
})

/* setando volumes dos audios para não ficarem muito altos */
var som = document.getElementById("som");
var musica_fundo = document.getElementById("musica_fundo");
musica_fundo.volume = 0.1;
som.volume = 0.2;

var som_luta = document.getElementById('som_luta');


/* faz um for para colocar som em cada mouseover de personagem */
var box = document.querySelectorAll('.personagens-box');
for(var i = 0; i < personagens.length; i++){
    box[i].addEventListener('mouseover',function(){
        som.pause();
        som.currentTime = 0;
        som.play();
    });

    /* aproveita o for e adiciona o evento de clique em cada personagem */
    box[i].addEventListener('click',function(t){
        musica_fundo.pause();//para a musica da tela de seleção
        som_luta.autoplay = true;
        som_luta.volume = 0.2;//muda o volume do som da luta pra nao ficar muito alto
        som_luta.play();//tocar o som da luta
        player = t.target.getAttribute('opt');//pega o atributo opt que é o numero do contador
        t.target.parentNode.style.backgroundColor = "yellow";//muda a cor da div para amarelo no clique
        /* um setTimeout para aguardar 1,5 segundos depois que o usuario clicar e esconder a div bg
        e habilitar as divs de resultado */
        setTimeout(function(){
            document.body.style.backgroundImage = "url('Imagens/img_torneio.jpg')";
            bg.style.display ="none";
            res.style.display = "flex";
            res_text.style.display = "flex";
            com = selecionaInimigo(0,12);//escolhe um inimigo de 0 a 11
            imgPlayer.src = personagens[player].imgLuta;//muda a imagem da img para a imagem de luta do personagem escolhido pelo player
            imgInimigo.src = personagens[com].imgLuta;//muda a imagem da img para a imagem de luta do personagem escolhido pelo inimigo
            textPlayer.innerHTML = "Nome: " + personagens[player].nome + "<br/>Poder: " + personagens[player].power;//adiciona as informações do personagem do player
            textInimigo.innerHTML = "Nome: " + personagens[com].nome + "<br/>Poder: " + personagens[com].power;//adiciona as informações do personagem do inimigo
        }, 1500);
    })
}
var resultadoDiv = document.querySelector('.vencedor-div');
/* função para exibir o vencedor da partida passando o v como parametro */
function vencedor(v){
    resultadoDiv.innerHTML = "<h1 id='vencedor'>Vencedor: "+ personagens[v].nome+ "</h1>"+
    "<img src='" + personagens[v].imagem + "' id='img-vencedor' />";
}

/*função para se der empate só exibir o h1 e não a imagem*/
function empate(){
    resultadoDiv.innerHTML = "<h1 id='vencedor'>Empate</h1>";
}

/* adiciona um evento do clique no botão lutar */
document.querySelector('button[name=lutar]')
    .addEventListener('click', function(v){
        imgPlayer.classList.add('anim_left');//mover o personagem do player pro lado >>
        imgInimigo.classList.add('anim_right');//mover o personagem do inimigo pro lado <<
        poderPlayer = parseInt(personagens[player].power);//converter o poder do player para numero inteiro
        poderCom = parseInt(personagens[com].power);//converter o poder do inimigo para numero inteiro
        /* aguardar 4 segundo para exibir o resultado */
        setTimeout(function(){
            /*se o player tiver mais poder que o inimigo o player vence e passa o numero do player
             como paramentro para vencedor() */
            if(poderPlayer > poderCom){
                imgPlayer.classList.remove('anim_left');//volta o personagem do player pro lugar inicial
                imgInimigo.classList.remove('anim_right');//volta o personagem do inimigo pro lugar inicial
                imgPlayer.src = personagens[player].imgVitoria;//troca a img do personagem do player para a foto de vitoria
                imgInimigo.src = personagens[com].imgDerrota;//troca a img do personagem do inimigo para a foto de derrota
                vencedor(player)//chama a função vencedor passando o numero do player como parametro
            }
            /*se o player tiver menos poder que o inimigo o inimigo vence e passa o numero do inimigo
             como paramentro para vencedor() */
            if(poderPlayer < poderCom){
                imgInimigo.classList.remove('anim_right');//volta o personagem do player pro lugar inicial
                imgPlayer.classList.remove('anim_left');//volta o personagem do inimigo pro lugar inicial
                imgPlayer.src = personagens[player].imgDerrota;//troca a img do personagem do player para a foto de derrota
                imgInimigo.src = personagens[com].imgVitoria;//troca a img do personagem do inimigo para a foto de vitoria
                vencedor(com);//chama função vencedor passando o numero do inimigo como parametro
            }
            if(poderPlayer == poderCom){
                imgPlayer.classList.remove('anim_left');//volta o personagem do player pro lugar inicial
                imgInimigo.classList.remove('anim_right');//volta o personagem do inimigo pro lugar inicial
                imgPlayer.src = personagens[player].imgDerrota;//troca a img do personagem do player para a foto de derrota
                imgInimigo.src = personagens[com].imgDerrota;//troca a img do personagem do inimigo para a foto de derrota
                empate();//chama a função empate para exibir o h1 empate
            }     
    }, 4000);
    /* aguarda 10 segundos e recarrega a pagina toda */
    setTimeout(function(){
        document.location.reload(true);
    }, 10000);
});



