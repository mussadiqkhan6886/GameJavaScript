const squares = document.querySelectorAll('.grid div');
const displayCurrentPlayer = document.querySelector('#current-player');
const displayResult = document.querySelector('#result');
let currentPlayer = 1;
let gameOver = false;

const winningArrays = [
    [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
    [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
    [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
    [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25], [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
    [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
    [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
    [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 17, 25, 33], [8, 16, 24, 32],
    [11, 17, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
    [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],
    [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
    [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34],
];

function checkBoard() {
    winningArrays.forEach(winningArray => {
        const square1 = squares[winningArray[0]];
        const square2 = squares[winningArray[1]];
        const square3 = squares[winningArray[2]];
        const square4 = squares[winningArray[3]];

        if (
            square1.classList.contains('player-one') &&
            square2.classList.contains('player-one') &&
            square3.classList.contains('player-one') &&
            square4.classList.contains('player-one')
        ) {
            displayResult.innerHTML = '🎉 Player One Wins!';
            endGame();
        }

        if (
            square1.classList.contains('player-two') &&
            square2.classList.contains('player-two') &&
            square3.classList.contains('player-two') &&
            square4.classList.contains('player-two')
        ) {
            displayResult.innerHTML = '🎉 Player Two Wins!';
            endGame();
        }
    });
}

// Function to disable further clicks
function endGame() {
    gameOver = true;
    squares.forEach(square => {
        let newSquare = square.cloneNode(true);
        square.replaceWith(newSquare); // Removes all event listeners
    });
}

// Handle player moves
squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        if (gameOver) {
            alert('Game over! Refresh to restar.');
            return;
        }

        if (squares[index + 7] && squares[index + 7].classList.contains('taken') && !square.classList.contains('taken')) {
            if (currentPlayer === 1) {
                square.classList.add('taken', 'player-one');
                currentPlayer = 2;
                displayCurrentPlayer.textContent = "2's turn";
            } else {
                square.classList.add('taken', 'player-two');
                currentPlayer = 1;
                displayCurrentPlayer.textContent = "1's turn";
            }
            checkBoard();
        } else {
            displayResult.innerHTML = 'Invalid Move'
            setTimeout(() => {
                    displayResult.innerHTML = ''
            }, 1000);
            
        }
    });
});
