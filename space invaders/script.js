const grid = document.querySelector('.grid');
let currentShooterIndex = 202;
let width = 15
let direction = 1
let invaderId
let goingRight = true

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
        squares[alienInvaders[i]].classList.add('invader');
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
}

invaderId = setInterval(moveInvader, 500)