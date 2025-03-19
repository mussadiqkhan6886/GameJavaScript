const grid = document.querySelector('.grid');
const displayResult = document.querySelector('#result')
let currentShooterIndex = 202;
let width = 15
let direction = 1
let invaderId
let goingRight = true
let aliensRemoved = []
let result = 0

for(let i =0; i<225; i++){
    const square = document.createElement('div');
    grid.append(square)
}

const squares = document.querySelectorAll('.grid div');

let alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for(let i = 0; i < alienInvaders.length; i++){
        if(!aliensRemoved.includes(i)){
            squares[alienInvaders[i]].classList.add('invader');
        }
    }

}
function removeDraw(){
    for(let i = 0; i < alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.remove('invader');
    }
}

draw()

squares[currentShooterIndex].classList.add('shooter');

function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft':
            if(currentShooterIndex % width !== 0) currentShooterIndex -= 1
            break
        case 'ArrowRight':
            if(currentShooterIndex % width < width -1) currentShooterIndex += 1
            break
    }
    squares[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter)

function moveInvader(){
    let leftEdge = alienInvaders[0] % width === 0
    let rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
    removeDraw()

    if(rightEdge && goingRight){
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }
    }

    if(leftEdge && !goingRight){
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }

    for(let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction
    }

    draw()

    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')){
        displayResult.innerHTML = 'Game Over'
        clearInterval(invaderId)
    }

    for(let i = 0; i < alienInvaders.length; i++){
        if(alienInvaders[i] >= 210){  // If an alien reaches the last row
            displayResult.innerHTML = 'Game Over!';
            clearInterval(invaderId);
            return; // Stop further execution
        }
    }
    
    if(aliensRemoved.length === alienInvaders.length){
        displayResult.innerHTML = 'You Win'
        clearInterval(invaderId)
    }
}

invaderId = setInterval(moveInvader, 100)

function shoot(e){
    let laserId 
    let laserCurrentIndex = currentShooterIndex
    function moveLaser(){
        squares[laserCurrentIndex].classList.remove('laser')
        laserCurrentIndex -= width
        squares[laserCurrentIndex].classList.add('laser')

        if(squares[laserCurrentIndex].classList.contains('invader')){
            squares[laserCurrentIndex].classList.remove('laser')
            squares[laserCurrentIndex].classList.remove('invader')
            clearInterval(laserId)
            const alienRemoved = alienInvaders.indexOf(laserCurrentIndex)
            aliensRemoved.push(alienRemoved)
            result++
            displayResult.innerHTML = result
        }
    }

    switch(e.key){
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
            break
    }
    
}

document.addEventListener('keydown', shoot)