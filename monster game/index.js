const xpValue = document.getElementById("xpValue");
const healthValue = document.getElementById("healthValue");
const goldValue = document.getElementById("goldValue");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const screen = document.querySelector(".text");
const monsterHealthValue = document.getElementById("monsterHealth");
const monsterNameValue = document.getElementById("monsterName");
const stat = document.querySelector(".monster");
let health = parseInt(healthValue.innerHTML);
let gold = parseInt(goldValue.innerHTML);
let xp = parseInt(xpValue.innerHTML);
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

button1.onclick = goShop;
button2.onclick = goCave;
button3.onclick = fightDragon;

const locations = [{
    name: "Shop",
    "button text" : ["Buy Health", "Buy Weapon", "Go to Town"],
    "button functions": [buyHealth, buyWeapon, goToTown],
    text: 'You are in Shop, as sign says "Shop" <br> Buy Health for 10 Gold and Weapon for 30 Gold',
},
{
    name: "Town",
    "button text" : ["Go to Store", "Go to cave", "Fight Dragon"],
    "button functions": [goShop, goCave, fightDragon],
    text: 'You are in Town',
},
{
    name: "Cave",
    "button text" : ["Fight slime", "Fight fanged beast", "Go to town Square"],
    "button functions": [fightSlime, fightBeast, goToTown],
    text: 'You enter the cave, You see some monsters',
}, {
    name : "fight",
    "button text" : ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goToTown],
    text: 'You are fighting a monster',
},{
    name : "lose",
    "button text" : ["Play Again", "Play Again", "Play Again"],
    "button functions": [playAgain, playAgain, playAgain],
    text: 'You Lose 💀, You Died',
}, {
    name : "Win",
    "button text" : ["Restart", "Restart", "Restart"],
    "button functions": [playAgain, playAgain, playAgain],
    text: 'You Won, You Killed Dragon',
}, {
    name: "Defeat",
    "button text" : ["TOWN", "TOWN", "TOWN"],
    "button functions": [goToTown, goToTown, goToTown],
    text: 'You Killed Monster, "Gained XP and Gold',
}];

const weapons = [
    {
        name: "Stick",
        damage: 5,
    },
    {
        name: "Dagger",
        damage: 15,
    },
    {
        name: "claw Hammer",
        damage: 25,
    },
    {
        name: "Sword",
        damage: 65
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

function updateLocation(location){
    stat.style.display = "none";
    button1.innerHTML = location["button text"][0];
    button2.innerHTML = location["button text"][1];
    button3.innerHTML = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    screen.innerHTML = location.text;
}
function goShop(){
    updateLocation(locations[0])
};
function goToTown(){
    updateLocation(locations[1]);
}
function goCave() {
    updateLocation(locations[2]);
};
function buyHealth(){
    if(gold >= 10 && health < 100){
        health += 10;
        if(health > 100){
            health = 100;
        }
        gold -= 10;
        goldValue.innerHTML = gold;
        healthValue.innerHTML = health;
       
    }else{
        if(gold < 10){
            screen.innerHTML = "You don't have enough gold";
        }else{
            screen.innerHTML = "You are already at max health";
        }
        
    }
}
function buyWeapon(){
    if(currentWeapon < weapons.length - 1){
        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldValue.innerHTML = gold;
            let newWeapon = weapons[currentWeapon].name;
            screen.innerHTML = "You bought New Weapon: " + newWeapon + "<br>";
            inventory.push(newWeapon);
            screen.innerHTML += "You're Inventory is " +  inventory;
        }else{
            screen.innerHTML = "Not enough Cash, Stranger!";
        }
    }else{
        screen.innerHTML = "You already have most Powerful Weapon <br>";
        screen.innerHTML += "Sell Weapon for 15 Gold";
        button2.innerHTML = "Sell Weapon";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon(){
    if(inventory.length > 1){
        gold += 15;
        goldValue.innerHTML = gold;
        let currentWeapon = inventory.shift();
        screen.innerHTML = `You Sold: ${currentWeapon} <br>`;
        screen.innerHTML += `New Inventory is: ${inventory}`;
    }else{
        screen.innerHTML = "You can't Sell every Weapon, You Must have atleast one weapon" + "<br>";
        screen.innerHTML += "Buy New weapon for 30 Gold";
        button2.innerHTML = "Buy Weapon";
        button2.onclick = buyWeapon;
    }
}


function fightSlime(){  
    fighting = 0;
    goFight();
}

function fightBeast(){
    fighting = 1;
    goFight();
}

function fightDragon(){
    fighting = 2;
    goFight();
}
function goFight(){
    updateLocation(locations[3]);
    monsterName = monsters[fighting].name;
    monsterHealth = monsters[fighting].health;
    monsterHealthValue.innerHTML = monsterHealth;
    monsterNameValue.innerHTML = monsterName;
    stat.style.display = "block";
}

function dodge(){
    screen.innerHTML = `You Dodged Attack from ${monsters[fighting].name}`;
}

function attack(){
    screen.innerHTML = `The ${monsters[fighting].name} Attacks <br>`;
    screen.innerHTML += `You Attacked ${monsters[fighting].name} with ${weapons[currentWeapon].name} <br>`;
   
    if(isMonsterHit()){
        health -= monsters[fighting].level;
    }else{
        screen.innerHTML += "You Missed";
    }
    
    monsterHealth -= weapons[currentWeapon].damage + Math.floor(Math.random() * xp) + 1;
    healthValue.innerHTML = health;
    monsterHealthValue.innerHTML = monsterHealth;


    if(health <= 0){
        healthValue.innerHTML = 0;
        lose();
    }else if(monsterHealth <= 0){
        fighting === 2 ? win() : defeatMonster();
    }

    if(Math.random() <= .1 && inventory.length !== 1){
        screen.innerHTML += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function lose(){
    updateLocation(locations[4]);
}
function defeatMonster(){
    xp += monsters[fighting].level
    gold += Math.floor(monsters[fighting].level * 6.7);
    xpValue.innerHTML = xp;
    goldValue.innerHTML = gold;
    updateLocation(locations[6]);
}

function win(){
    updateLocation(locations[5]);
}
function playAgain(){
    xp = 0;
    health = 100;
    gold = 10;
    currentWeapon = 0;
    inventory = ["sticks"];
    goldValue.innerHTML = gold;
    healthValue.innerHTML = health;
    xpValue.innerHTML = xp;
    goToTown();
}

function isMonsterHit(){
    return Math.random() > .2 || health < 20; 
}

