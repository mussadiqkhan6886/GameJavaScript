const score = document.querySelector('#score');
const time = document.querySelector('#time');
const squares = document.querySelectorAll('.square');
let result = 0;
let hitPosition;
let timerId = null;
let currentTime = 20;
let currentTimerId

function randomSquare(){
    squares.forEach(square => {
        square.classList.remove('mole');
    });
    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;

}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == hitPosition){
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    })
})

function showMole(){
    timerId = setInterval(randomSquare, 600);
}

setTimeout(() => {
    showMole();
}, 2000);

function countDown(){
    currentTime--;
    time.innerHTML = currentTime;
    if(currentTime == 0){
        clearInterval(timerId);
        clearInterval(currentTimerId);
        alert(`Time Over, Score: ${result}`);
        const button = document.createElement('button');
        document.body.appendChild(button);
        button.innerHTML = 'Play Again';
        button.addEventListener('click', () => {
            showMole();
            result = 0;
            score.innerHTML = 0;
            currentTime = 20;
            time.innerHTML = 20;
            currentTimerId = setInterval(countDown, 1000);
            button.remove();
        })
    }
}

setTimeout(() => {
     currentTimerId = setInterval(countDown, 1000)
}, 2000)