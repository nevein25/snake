
let speed = 0;
let level = 'easy';

//taking data from user
document.querySelector(".game-start span").onclick = function () {

    let name = document.querySelector("input").value;
    if (name == null || name == "") {

        document.querySelector(".name span").innerHTML = 'Unknown';

    } else {

        document.querySelector(".name span").innerHTML = name;

    }
    let gameLevel = document.querySelector('#game-level');

    switch (gameLevel.selectedIndex) {
        case 0:
            speed = 7;
            level = 'easy';
            break;
        case 1:
            speed = 20;
            level = 'Medium';
            break;
        case 2:
            speed = 50;
            level = 'Hard';
            break;
        default:
            level = 'easy';
            speed = 7;
    }
    document.querySelector(".game-start").remove();
};

let canvas = document.getElementById("game");
let ctx = canvas.getContext('2d');



let squareSize = 20;
let rows = canvas.width / squareSize;
let columns = canvas.height / squareSize;

let snakeHeadX = 20 * squareSize;
let snakeHeadY = 20 * squareSize;

let xVelocity = 0;
let yVelocity = 0;

let foodX;
let foodY;

let snakeBody = [];

let gameOver = false;

var img = new Image();

img.src = "apple3.png";

let score = 0;



function drawScore() {
    let gameScore = document.querySelector(".score span");
    let scoreText = document.createTextNode(score);
    gameScore.appendChild(scoreText);

    document.querySelector(".score span").innerText = score;

}

function gameLoop() {
    moveingSnake();
    let res = isGameOver();
    if (res) {
        return;
    }



    drawBoard();
    drawFood();
    snakeFood();

    drawSnake();
    drawLevel();

    setTimeout(gameLoop, 1000 / speed);
}
function drawLevel() {
    ctx.fontStyle = '#5a1c1c';
    ctx.font = "15px Trebuchet MS";
    ctx.fillText("Level: " + level, canvas.width - 100, 18);
    //console.log(level);
}

function drawBoard() {
    ctx.fillStyle = '#F2EFDC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {


    ctx.fillStyle = '#5a1c1c';

    //head
    ctx.fillRect(snakeHeadX, snakeHeadY, squareSize, squareSize);

    // ctx.beginPath();
    // ctx.arc(snakeHeadX,snakeHeadY,10,0,2 * Math.PI);
    // ctx.fill();

    //body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }


    for (let i = 0; i < snakeBody.length; i++) {

        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], squareSize, squareSize);

        // ctx.beginPath();
        // ctx.arc(snakeBody[i][0],snakeBody[i][1],10,0,2 * Math.PI);
        // ctx.fill();
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeHeadX, snakeHeadY];
    }

}
function placeFoodRandom() {
    foodX = Math.floor(Math.random() * rows) * squareSize;
    foodY = Math.floor(Math.random() * columns) * squareSize;
}

function drawFood() {
    if (typeof foodX === 'undefined') {
        placeFoodRandom();
    }

    //  ctx.fillRect(foodX, foodY, squareSize, squareSize);
    //       ctx.fillStyle = '#F44336';
    //   ctx.beginPath();
    //   ctx.arc(foodX,foodY,10,0,2 * Math.PI);
    //   ctx.fill();
    ctx.drawImage(img, foodX, foodY, 20, 20);
}

function snakeFood() {

    if (snakeHeadX == foodX && snakeHeadY == foodY) {
        score++;

        document.querySelector(".score span").innerText = score;
        snakeBody.push([foodX, foodY]);
        placeFoodRandom();
        drawFood();

    }
}

function moveingSnake() {
    snakeHeadX += xVelocity * squareSize;
    snakeHeadY += yVelocity * squareSize;

    //making the snake break the walls

    //right
    if (snakeHeadX == canvas.width) {
        snakeHeadX = 0;
    }
    // //left
    else if (snakeHeadX < 0) {
        snakeHeadX = canvas.width;
    }
    // //up
    else if (snakeHeadY < 0) {
        snakeHeadY = canvas.height;
    }
    //down
    else if (snakeHeadY == canvas.height) {
        snakeHeadY = 0;
    }

}

function isGameOver() {
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]) {
            gameOver = true;

            let lose = document.createElement("div");
            lose.className = "game-over";
            document.body.appendChild(lose);


            let loseChild = document.createElement("span");
            let loseText = document.createTextNode("Game over\n Your Final Score Is " + score);
            loseChild.appendChild(loseText);
            lose.appendChild(loseChild);

            let playAgain = document.createElement("span");
            playAgain.className = "play-again";
            let playAgainText = document.createTextNode("Play Again?");
            playAgain.appendChild(playAgainText);
            lose.appendChild(playAgain);

            document.querySelector(".play-again").onclick = function () {
                location.reload();
            }


        }
    }
    return gameOver;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //up
    if (event.code == "ArrowUp" && yVelocity != 1) {
        xVelocity = 0;
        yVelocity = -1;
    }

    //down
    else if (event.code == "ArrowDown" && yVelocity != -1) {
        xVelocity = 0;
        yVelocity = 1;
    }

    //left
    else if (event.code == "ArrowLeft" && xVelocity != 1) {
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    else if (event.code == "ArrowRight" && xVelocity != -1) {
        yVelocity = 0;
        xVelocity = 1;
    }

}
gameLoop();