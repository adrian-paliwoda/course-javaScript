const startGameBtn = document.getElementById('start-game-btn');
// const startGame = function() {
//     console.log("Game started...")
// }

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;

const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';

const DRAW = 'DRAW'
const PLAYER_WIN = 'PLAYER_WINS'
const COMPUTER_WIN = 'COMPUTER_WINS'

let gameIsRunning = false;

let person = {
    greet: () => {
        console.log("Welcome!")
    },
}
person.greet();
console.log(typeof person.greet);


const getPlayerChoice = () => {
    const selection = prompt('Rock, Paper, Scissors?', '')
        .toUpperCase();

    if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
        alert('Invalid choice. Default value will be set');
        return DEFAULT_USER_CHOICE;
    }

    return selection;
}

const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return ROCK;
    }
    if (randomValue < 0.67) {
        return PAPER;
    }
    return SCISSORS;
}

const doesPlayerWin = (computerChoice, playerChoice = DEFAULT_USER_CHOICE) =>
    (computerChoice === ROCK && playerChoice === PAPER)
    || (computerChoice === PAPER && playerChoice === SCISSORS);

const getWinner = (computerChoice, playerChoice) =>
    computerChoice === playerChoice ? DRAW : doesPlayerWin(computerChoice, playerChoice) ? PLAYER_WIN : COMPUTER_WIN;

startGameBtn.addEventListener('click', () => {
    if (gameIsRunning) {
        return;
    }

    gameIsRunning = true;
    console.log("Game started...");

    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    console.log(playerChoice);
    console.log(computerChoice);

    const winner = getWinner(computerChoice, playerChoice);
    let message = `You picked ${playerChoice}, computer picked ${computerChoice}`;
    if(winner  === DRAW)
    {
        message = message + ', therefore you had a draw'
    }
    else if (winner === PLAYER_WIN) {
        message = message + ', therefore you win'
    }
    else{
        message = message + ', therefore you lost'
    }
    alert(message);

    gameIsRunning = false;
});
