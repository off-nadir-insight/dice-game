// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const gambleBtnPlayer1 = document.getElementById('gamble-btn-player1');
const gambleBtnPlayer2 = document.getElementById('gamble-btn-player2');
const oddsPlayer1 = document.getElementById("odds-p1");
const oddsPlayer2 = document.getElementById("odds-p2");


// functions

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}

function removeBuff(player) {
    player.classList.add('hidden');
    player.classList.remove('engaged');
}

function setModifier(gamblePlayer, playerOdds) {
    if (gamblePlayer.classList.contains("engaged")) {
        if (Math.random()*100 < playerOdds) {
            return 2;
        } else {
            return -2;
        }
    } else {
        return 1;
    }
}

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    gambleBtnPlayer1.classList.remove("engaged")
    gambleBtnPlayer1.classList.remove("hidden")
    gambleBtnPlayer2.classList.remove("engaged")
    gambleBtnPlayer2.classList.remove("hidden")
    oddsPlayer1.textContent = "0";
    oddsPlayer2.textContent = "0";
}


// event listeners

rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1
    const player1Odds = Math.floor((player1Score / 20)*100);
    const player2Odds = Math.floor((player2Score / 20)*100);

    oddsPlayer1.textContent = `${player1Odds}%`;
    oddsPlayer2.textContent = `${player2Odds}%`;
    let modifier;

    if (player1Turn) {
        modifier = setModifier(gambleBtnPlayer1, player1Odds)
        player1Score += randomNumber * modifier
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
        if (gambleBtnPlayer1.classList.contains("engaged")) {
            removeBuff(gambleBtnPlayer1)
        }
    } else {
        modifier = setModifier(gambleBtnPlayer2, player2Odds) 
        player2Score += randomNumber * modifier
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player1Dice.classList.add("active")
        player2Dice.classList.remove("active")
        message.textContent = "Player 1 Turn"
        if (gambleBtnPlayer2.classList.contains("engaged")) {
            removeBuff(gambleBtnPlayer2)
        }
    }
    
    if (player1Score >= 20) {
        message.textContent = "Player 1 Won 🥳"
        showResetButton()
        removeBuff(gambleBtnPlayer1)
        removeBuff(gambleBtnPlayer2)
    }  else if (player2Score >= 20) {
        message.textContent = "Player 2 Won 🎉"
        showResetButton()
        removeBuff(gambleBtnPlayer1)
        removeBuff(gambleBtnPlayer2)
    }
    player1Turn = !player1Turn
})

resetBtn.addEventListener("click", function(){
    reset()
})

document.getElementById('container__exploding-dice').addEventListener('click', e => {
    if (!e.target.classList.contains('gambleDice')) return;
    e.target.classList.toggle('engaged');
})