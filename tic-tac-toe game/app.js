const boxes = document.querySelectorAll("#box");
const resetBtn = document.querySelector('#reset-game');
const winnerResult = document.getElementById("winner");
const newGameBtn = document.querySelector("#new-game");
const section = document.querySelector(".new");
let turnO = true;
let patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const newGame = () => {
    turnO = true;
    boxes.forEach((box) => {
        box.innerHTML = '';
        box.disabled = false;
    });
    section.classList.add('hide');
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(turnO){
            box.innerHTML = 'O';
            box.style.color = 'black';
            turnO = false;
        }else{
            box.innerHTML = "X";
            box.style.color = 'red';
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
})

const showWinner = (winner) => {
    boxes.forEach(box => {
        box.disabled = true;
    });
    winnerResult.innerHTML = `Congratulations! Player ${winner} Won!!!!`;
    section.classList.remove('hide');
}

const checkWinner = () => {
    for(let pattern of patterns){
        const pos1Val = boxes[pattern[0]].innerText;
        const pos2Val = boxes[pattern[1]].innerText;
        const pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val !== '' && pos2Val !== '' && pos3Val !== ''){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}

resetBtn.addEventListener('click', newGame);
newGameBtn.addEventListener('click', newGame);