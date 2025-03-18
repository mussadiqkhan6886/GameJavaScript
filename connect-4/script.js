const squares = document.querySelectorAll('.grid div');
const displayCurrentPlayer = document.querySelector('#current-player');
const displayResult = document.querySelector('#result');
let currentPlayer = 1;

squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        if(squares[index + 7].classList.contains('taken')){
            if(currentPlayer == 1){
                square.classList.add('taken');
                square.classList.add('player-one');
                currentPlayer = 2;
                displayCurrentPlayer.textContent = ' 2\'s turn';
            } else if(currentPlayer == 2){
                square.classList.add('taken');
                square.classList.add('player-two');
                currentPlayer = 1;
                displayCurrentPlayer.textContent = ' 1\'s turn';
            }
        }else alert("Can't go there")
    })
})