const resetBtn = document.getElementById('reset');
const gameBoard = document.querySelector('#canvas');
const scoreText = document.querySelector("#score")
const ctx = canvas.getContext('2d');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 25;
const background = 'lightGray';
const snakeColor = 'lightGreen';
const snakeBorder = 'black';
const foodColor = 'red';
let running = false;
let foodX;
let foodY;
let xVelocity = unitSize;
let yVelocity = 0;
let score = 0;
let snake = [
    {x:unitSize * 4,y:0},
    {x:unitSize * 3,y:0},
    {x:unitSize * 2,y:0},
    {x:unitSize,y:0},
    {x:0,y:0},
]

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

startGame();

function startGame(){};
function nextTick(){};
function clearBoard(){};
function createFood(){};
function drawFood(){};
function moveSnake(){};
function drawSnake(){};
function changeDirection(){};
function checkGameOver(){};
function displayGameOver(){};
function resetGame(){};