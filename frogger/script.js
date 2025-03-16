const score = document.querySelector('#result');
const timeLeft = document.querySelector('#time');
const grid = document.querySelector(".grid");
const button = document.querySelector('.start-pause-button');
const squares = document.querySelectorAll('.grid div');
let currentIndex = 76;
let width = 9;
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
let timerId;
let outcomeId
let currentTime = 20;
const playAgainButton = document.querySelector('.playAgain')

function moveFrog(e){
    squares[currentIndex].classList.remove('frog');
    switch(e.key){
        case "ArrowLeft":
            if(currentIndex % width !== 0) currentIndex -= 1;
            break
        case "ArrowRight":
            if(currentIndex % width < width - 1) currentIndex += 1;
            break
        case 'ArrowUp':
            if(currentIndex - width >= 0) currentIndex -= width;
            break
        case 'ArrowDown':
            if(currentIndex + width < width * width) currentIndex += width;
            break;
    }
    squares[currentIndex].classList.add('frog');
}

function autoMovesElements(){
    currentTime--;
    timeLeft.innerHTML = currentTime    
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
    lose()
    win()
}

function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1'):
            logLeft.classList.add('l2');
            logLeft.classList.remove('l1');
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.add('l3');
            logLeft.classList.remove('l2');
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.add('l4');
            logLeft.classList.remove('l3');
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.add('l5');
            logLeft.classList.remove('l4');
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.add('l1');
            logLeft.classList.remove('l5');
            break
    }
}

function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains('l1'):
            logRight.classList.add('l5');
            logRight.classList.remove('l1');
            break
        case logRight.classList.contains('l2'):
            logRight.classList.add('l1');
            logRight.classList.remove('l2');
            break
        case logRight.classList.contains('l3'):
            logRight.classList.add('l2');
            logRight.classList.remove('l3');
            break
        case logRight.classList.contains('l4'):
            logRight.classList.add('l3');
            logRight.classList.remove('l4');
            break
        case logRight.classList.contains('l5'):
            logRight.classList.add('l4');
            logRight.classList.remove('l5');
            break
    }
}

function moveCarLeft(carLeft){
    switch(true){
        case carLeft.classList.contains('c1'):
            carLeft.classList.add('c2');
            carLeft.classList.remove('c1');
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.add('c3');
            carLeft.classList.remove('c2');
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.add('c1');
            carLeft.classList.remove('c3');
            break
    }
}

function moveCarRight(carRight){
    switch(true){
        case carRight.classList.contains('c1'):
            carRight.classList.add('c3');
            carRight.classList.remove('c1');
            break
        case carRight.classList.contains('c3'):
            carRight.classList.add('c2');
            carRight.classList.remove('c3');
            break
        case carRight.classList.contains('c2'):
            carRight.classList.add('c1');
            carRight.classList.remove('c2');
            break
    }
}

function checkLoseAndWin(){
    lose()
    win()
}

function newGame(){
    playAgainButton.style.display = 'none'
    pausePlay()
    currentTime = 20;
    currentIndex = 76;
    score.innerHTML = ''
    timeLeft.innerHTML = '20'
}

function lose(){
    if(squares[currentIndex].classList.contains('c1') || squares[currentIndex].classList.contains('l4') || squares[currentIndex].classList.contains('l5') || currentTime <= 0){
        clearInterval(timerId);
        clearInterval(outcomeId)
        score.innerHTML = 'You Lose';
        document.removeEventListener('keyup', moveFrog);
        squares[currentIndex].classList.remove('frog');
        playAgainButton.addEventListener('click', newGame);
        playAgainButton.style.display = 'block'
    }
}

function win(){
    if(squares[currentIndex].classList.contains('ending-block')){
        clearInterval(timerId);
        clearInterval(outcomeId)
        score.innerHTML = 'You WON';
        document.removeEventListener('keyup', moveFrog)
        playAgainButton.addEventListener('click', newGame);
        playAgainButton.style.display = 'block'
    }
}

function pausePlay(){
    if(timerId){
        clearInterval(timerId)
        timerId = null 
        clearInterval(outcomeId)
        outcomeId = null
        document.removeEventListener('keyup', moveFrog)
    }else {
        timerId = setInterval(autoMovesElements, 1000)
        outcomeId = setInterval(checkLoseAndWin, 50)
        document.addEventListener('keyup', moveFrog);
    }
}

button.addEventListener('click', pausePlay)
