const DEFAULT_MAX_LIFE = 100;
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let battleLog = [];

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_END_GAME = 'END_GAME';

const userInput = prompt("Maximum life for you and the monster:", "100");

let maxHealth;
try{
    maxHealth = validUserInputForMaxLife(parseInt(userInput));
}
catch (e) {
    maxHealth = DEFAULT_MAX_LIFE;
    console.log(e.message);
}finally {
    console.log('User max life: ' + maxHealth)
}



let chosenPlayerLife = maxHealth;
let currentMonsterHealth = maxHealth;
let bonusLives = 1;

initialGame(maxHealth, bonusLives);

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', logHandler)

function attackMonster(mode) {
    let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    const damage = dealMonsterDamage(maxDamage);
    const damageFromMonster = dealPlayerDamage(MONSTER_ATTACK_VALUE);

    writeLog(logEvent, damage, currentMonsterHealth, chosenPlayerLife);
    writeLog(LOG_EVENT_MONSTER_ATTACK, damageFromMonster, currentMonsterHealth, chosenPlayerLife);

    currentMonsterHealth -= damage;
    chosenPlayerLife -= damageFromMonster;



    if (chosenPlayerLife < 0 && bonusLives > 0) {
        bonusLives--;
        bonusLifeEl.textContent = bonusLives;

        chosenPlayerLife += damageFromMonster;
        increasePlayerHealth(damageFromMonster);
    }

    checkIfIsEndGame();
}


function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function healPlayerHandler() {
    increasePlayerHealth(HEAL_VALUE);
    chosenPlayerLife = chosenPlayerLife + HEAL_VALUE;

    if (chosenPlayerLife > maxHealth) {
        chosenPlayerLife = maxHealth
    }

    writeLog(LOG_EVENT_PLAYER_HEAL, HEAL_VALUE, currentMonsterHealth, chosenPlayerLife);

    const damageFromMonster = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    writeLog(LOG_EVENT_MONSTER_ATTACK, damageFromMonster, currentMonsterHealth, chosenPlayerLife);

    chosenPlayerLife -= damageFromMonster;
    if (chosenPlayerLife < 0 && bonusLives > 0) {
        bonusLives--;
        bonusLifeEl.textContent = bonusLives;

        chosenPlayerLife += damageFromMonster;
        increasePlayerHealth(damageFromMonster);
    }

    checkIfIsEndGame();
}

function checkIfIsEndGame() {
    if (currentMonsterHealth <= 0 && chosenPlayerLife <= 0) {
        alert('Draw');
        resetOurGame(maxHealth);
        writeLog(LOG_EVENT_END_GAME, "Draw.", currentMonsterHealth, chosenPlayerLife );
    }
    else if (currentMonsterHealth <= 0) {
        alert('You won!')
        resetOurGame(maxHealth);
        writeLog(LOG_EVENT_END_GAME, "Player won.", currentMonsterHealth, chosenPlayerLife );
    }
    else if (chosenPlayerLife <= 0) {
        alert('You lost!');
        resetOurGame(maxHealth);
        writeLog(LOG_EVENT_END_GAME, "Monster won.", currentMonsterHealth, chosenPlayerLife );
    }
}

function logHandler() {
    // let i = 0;
    //
    // while (i < 3) {
    //     console.log("------------------------");
    //
    //     i++;
    // }

    for (let i = 0; i < 3; i++){
        console.log("------------------------");
    }

    let index = 0;
    outerWhile: for (const log of battleLog) {
        console.log(`#${index}`)

        innerFor: for (let key in log) {
            console.log(`#${index} ==> ${log[key]}`);
            if (log[key] == ATTACK_VALUE) {
                break outerWhile;
                //continue outerWhile;
            }
        }

        index++;
    }
}

function resetOurGame(value) {
    adjustHealthBars(value);
    resetGame(value);
    resetLife(value);
}

function resetLife(value) {
    chosenPlayerLife = value;
    currentMonsterHealth = value;
    bonusLives = 1;
}

function validUserInputForMaxLife(userInput) {
    if (isNaN(userInput)
        || userInput <= 0) {

        throw {message: "Invalid user input, not a number!"};
    }

    return userInput;
}

function writeLog(event, value, monsterHealth, playerHealth) {
    let logEntry
    switch (event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'MONSTER',
                monsterHealth: monsterHealth,
                playerHealth: playerHealth
            };
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'MONSTER',
                monsterHealth: monsterHealth,
                playerHealth: playerHealth
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                monsterHealth: monsterHealth,
                playerHealth: playerHealth
            };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                monsterHealth: monsterHealth,
                playerHealth: playerHealth
            };
            break;
        case LOG_EVENT_END_GAME:
            logEntry = {
                event: event,
                value: value,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        default:
            logEntry = {}
            break;
    }
    battleLog.push(logEntry);
}