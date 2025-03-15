let cardGame = [
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    },
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    }
]

let score = document.querySelector('#result');
let gridDisplay = document.querySelector('#grid');
let chooseCard = [];
let cardIdChosen = [];
let wonCards = [];

cardGame.sort(() => 0.5 - Math.random());

function createDisplay(){
    for(let i = 0; i < cardGame.length; i++){
        const img = document.createElement('img');
        img.setAttribute('src', 'img/blank.png');
        img.setAttribute('data-id', i);
        img.addEventListener('click', flipCard);
        gridDisplay.append(img);
    }
}
createDisplay();

function checkMatch(){
    const card = document.querySelectorAll('img');
    const idCardOne = cardIdChosen[0];
    const idCardTwo = cardIdChosen[1];
    if(idCardOne == idCardTwo){
        card[idCardOne].setAttribute('src', 'img/blank.png');
        card[idCardTwo].setAttribute('src', 'img/blank.png');
        alert("You clicked same Card");
    }
    else if(chooseCard[0] == chooseCard[1]){
        alert("Match Found");
        card[idCardOne].setAttribute('src', 'img/white.png');
        card[idCardTwo].setAttribute('src', 'img/white.png');
        card[idCardOne].removeEventListener('click', flipCard);
        card[idCardTwo].removeEventListener('click', flipCard);
        wonCards.push(chooseCard);
        document.querySelector('#wrong').innerHTML = 'Correct';
    }else{
        card[idCardOne].setAttribute('src', 'img/blank.png');
        card[idCardTwo].setAttribute('src', 'img/blank.png');
        document.querySelector('#wrong').innerHTML = 'Try Again, Wrong Guess';
    }
    score.innerHTML = wonCards.length;
    chooseCard = [];
    cardIdChosen = [];
    if(wonCards.length == card.length / 2){
        score.innerHTML = 'Congratulations!! You Found Them All!!!';
    }
}


function flipCard(){
    const cardId = this.getAttribute('data-id');
    chooseCard.push(cardGame[cardId].name);
    cardIdChosen.push(cardId);
    this.setAttribute('src', cardGame[cardId].img);
    if(chooseCard.length === 2){
        setTimeout(checkMatch, 500);
    }
}