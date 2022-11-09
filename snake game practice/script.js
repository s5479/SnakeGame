const bgmusic = new Audio('sounds/bgmusic.mp3');
const bite = new Audio('sounds/bite.mp3');
const gameover = new Audio('sounds/gameover.mp3');
const move = new Audio('sounds/move.mp3');



var blockSize = 25;
var rows = 15;
var cols = 25;

var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var gameOver = false;
let count = 0;

let score = document.getElementById('score');
const restart = document.getElementById('restart');

restart.addEventListener('click', () => {
     location.reload();
}) 
window.onload = function(){
     
    board = document.getElementById('board');
    //  console.log(board);
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    // console.log(context);
    placeFood();
    document.addEventListener("keyup", changeDirection);
   
    // update();
     setInterval(update, 1000/5);
    
}

function update(){
     if(gameOver){
          return;
     }
    context.fillStyle = "green";
     context.fillRect(0, 0, board.width, board.height);

     context.fillStyle = "red";
     context.fillRect(foodX, foodY, blockSize, blockSize);

     if(snakeX == foodX && snakeY == foodY){
          bite.play();
          snakeBody.push([foodX, foodY]);
          placeFood();
        
          count++;
          score.innerHTML = count;

     }


     for(let i = snakeBody.length-1; i>0; i--){
          snakeBody[i] = snakeBody[i-1];
     }

     if(snakeBody.length){
          snakeBody[0] = [snakeX, snakeY];
     }

     context.fillStyle = "blue";
     snakeX += velocityX * blockSize;
     snakeY += velocityY  * blockSize;
     // console.log(snakeX);
     // console.log(snakeY);
     context.fillRect(snakeX, snakeY, 28, 28);

     for(i=0;i<snakeBody.length;i++){
          context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
     }

     if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
          gameOver = true;
          gameover.play();
          displayGameOver();
     }

     for(let i = 0 ; i <snakeBody.length ; i++){
          if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
               gameOver = true;
               gameover.play();
               displayGameOver();
          }
     }
     
 
 }

 function changeDirection(e){
        if(e.code == "ArrowUp" && velocityY != 1){
             velocityX = 0;
             velocityY = -1;
          //    move.play();
        }  
        else if(e.code == "ArrowDown" && velocityY != -1){
             velocityX = 0;
             velocityY = 1;
          //    move.play();

        }  
        else if(e.code == "ArrowRight" && velocityX != -1){
             velocityX = 1;
             velocityY = 0;
          //    move.play();

        }  
        else if(e.code == "ArrowLeft" && velocityX != 1){
             velocityX = -1;
             velocityY = 0;
          //    move.play();

        }  
 }

 function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    
 }

 function up(){
     if(velocityY != 1){
          velocityX = 0;
          velocityY = -1;
       //    move.play();
     }  
 }
 function down(){
     if(velocityY != -1){
          velocityX = 0;
          velocityY = 1;
       //    move.play();

     }  
 }
 function left(){
     if(velocityX != 1){
          velocityX = -1;
          velocityY = 0;
       //    move.play();

     }  
 }
 function right(){
     if( velocityX != -1){
          velocityX = 1;
          velocityY = 0;
     }
 }
 function displayGameOver(){
     gameWidth = 600;
     gameHeight = 400;
     context.font = "50px MV Boli";
     context.fillStyle = "black";
     context.textAlign = "center";
     context.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    console.log("heloo");
 };