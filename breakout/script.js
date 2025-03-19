let grid = document.querySelector('.grid');
let scoreDisplay = document.querySelector('#score');
let buttonPlay = document.querySelector('#play')
let blockWidth = 100;
let blockHeight = 20;
let fullWidth = 560;
let fullHeight = 300;
let ballDiameter = 20;
let xDirection = -2;
let yDirection = 2;
let ballInterval;
let score = 0;
let flag = false;

class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, blockHeight + yAxis];
        this.topRight = [xAxis + blockWidth, blockHeight + yAxis]
    }
}

const userStart = [230, 10];
let currentPosition = userStart;
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

function createBlock(){
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.append(block);
    }
   
}
createBlock();

function drawUser(){
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';  
} 
function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';  
}

let user = document.createElement('div');
user.classList.add('user');
grid.append(user);
drawUser();

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10;
                drawUser();    
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0] < fullWidth - blockWidth){
                currentPosition[0] += 10;
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)


let ball = document.createElement('div');
ball.classList.add('ball');
grid.append(ball);
drawBall();

function moveBall(){
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall()
    checkForCollision();
}
 


function checkForCollision(){
    // Block collisions
    for(let i = 0; i < blocks.length; i++){
        if(
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){    
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block')
            score++;
            scoreDisplay.innerHTML = `Score: ${score}`;
            blocks.splice(i, 1);
            changeDirection();
        }
    }
    // border Collisions
    if(
        ballCurrentPosition[0] >= (fullWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (fullHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
    ){
        changeDirection();
    }

    // user collision
    if(
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) && 
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ){
        changeDirection();
    }

    if(blocks.length === 0){
        scoreDisplay.innerHTML = `Score: ${score}, You WON!!`;
        clearInterval(ballInterval);
        document.removeEventListener('keydown', moveUser);
    }

    if(ballCurrentPosition[1] <= 0){
        scoreDisplay.innerHTML = `Score: ${score}, Game Over You Lost`;
        clearInterval(ballInterval);
        document.removeEventListener('keydown', moveUser);
        flag = true;
    }
}
function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2;
        return
    }
    if(xDirection === 2 && yDirection === -2){
        xDirection = -2;
        return;
    }
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2;
        return;
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2;
    }
}

buttonPlay.addEventListener('click', () => {
    ballInterval = setInterval(moveBall, 20);
    if(flag){
        location.reload();
    }
})