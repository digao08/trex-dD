var trex, trex_correndo, trex_colidiu;
var obstaculo;
var solo, soloinvisivel, imagemdosolo;
var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
var JOGAR = 1;     
var ENCERRAR = 0;
var ESTADOJOGO = JOGAR;
var pontuacao;
var gameover , restart,fimdejogo,reiniciar;
//var serve para começar a colocar coisas dentro do jogo

function preload(){
  trex_correndo =loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  
  obstaculo2 = loadImage("obstacle2.png");
  
  obstaculo3 = loadImage("obstacle3.png");
  
  obstaculo4 = loadImage("obstacle4.png");
  
  obstaculo5 = loadImage("obstacle5.png");
    
  obstaculo6 = loadImage("obstacle6.png");
  
  gameover = loadImage("gameOver.png");
  
  restart = loadImage ("restart.png");

  //load image é para carregar a imagem no código
 
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
   trex.addAnimation("collided",trex_colidiu)
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -4;
  
  fimdejogo =createSprite (300,70);
  fimdejogo.addImage(gameover);
  fimdejogo.visible = false;
  fimdejogo.scale=0.9;
 
  reiniciar = createSprite(300,120);
  reiniciar.addImage(restart);
  reiniciar.visible = false;
  reiniciar.scale = 0.8
  
  //createsprite é para criar as coisas na tela
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  //para o trex nao cair
  
  
  pontuacao = 0;//para pontuação começar em 0
  
  grupodeobstaculo=createGroup();
  grupodenuvens=createGroup();
  //para conseguir criar varios obsatculos e varias nuvens
  
  
  
}

function draw() {
  background(180);
  
  text ("pontuacao="+pontuacao,480,70); 
  
  if(ESTADOJOGO === JOGAR){
    if(keyDown("space") && trex.y>=150) {
      trex.velocityY = -10
      pontuacao=pontuacao+Math.round(frameRate()/60);


      //para o trex pular
    }
    
    
    trex.velocityY = trex.velocityY + 0.8
    if (solo.x < 0){ solo.x = solo.width/2; }
     solo.velocityX = -7;
    //adicionar velocidade ao trex
   
    
    trex.collide(soloinvisivel);
    if(grupodeobstaculo.isTouching(trex)){
      ESTADOJOGO = ENCERRAR;
    
      fimdejogo.visible = true;
      reiniciar.visible = true
       trex.changeAnimation("collided",trex_colidiu);
      //para o jogo conseguir começar e acabar
      //o touching e para se o trex encostar no cacto o jogo para
      
     
    }
    gerarNuvens();
    gerarObstaculos();
   
    //para criar as nuvens e os obstaculos
  }
  else if (ESTADOJOGO === ENCERRAR){ 
    if(mousePressedOver(reiniciar)){
      console.log("resetado")
       Reset();
    }
   trex.velocityY = 0;
   solo.velocityX = 0;
    nuvem.velocityX = 0;
    grupodeobstaculo.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
    grupodeobstaculo.setLifetimeEach(-1);
    grupodenuvens.setLifetimeEach(-1);
   /* console.log("resetado");*/
    //para tirar a velocidade do trex
    //o console serve para aparecer ali em baixo
  }
  //para aparecer a pontuacao especifica em uma parte da tela
  //math.round e para ter uma conta matematica
       drawSprites();
  //para criar tudo
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  
  
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage(imagemdanuvem)
    nuvem.y = Math.round(random(10,60))
    nuvem.scale = 0.4;
    nuvem.velocityX = -3;
    
    grupodenuvens.add(nuvem);
    //para adicionar a nuvem no jogo
    
    //ajustando a profundidade
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}


function gerarObstaculos(){
  if(frameCount % 60 === 0){
   obstaculo=createSprite(600,165,10,40);
    obstaculo.velocityX = -10;
    //para adicionar os obstaculos
    
    var aleatorio = Math.round(random(1,6));//para os obstaculos aparecerem em lugares diferentes
    switch(aleatorio){//round 6 sorteio cabo de guerra
      case 1: obstaculo.addImage(obstaculo1);
      case 2:  obstaculo.addImage(obstaculo2);
      case 3:  obstaculo.addImage(obstaculo3);
      case 4:  obstaculo.addImage(obstaculo4);
      case 5:  obstaculo.addImage(obstaculo5);
      case 6:  obstaculo.addImage(obstaculo6);
        //para aparecer a imagem do cacto
         obstaculo.scale = 0.5;
        //para colocar a altura do cacto
    }
    grupodeobstaculo.add(obstaculo);
    //para adicionar os obstaculos
  }
}
function Reset(){
   ESTADOJOGO = JOGAR;
  grupodeobstaculo.destroyEach();
  grupodenuvens.destroyEach();
  trex.changeAnimation("running",trex_correndo);
  fimdejogo.visible=false;
  reiniciar.visible=false; 
   pontuacao=0
  
}