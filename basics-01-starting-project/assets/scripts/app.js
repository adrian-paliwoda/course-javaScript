const defaultResult = 0;

let currentResult = defaultResult;
let logEntries = [];

addBtn.addEventListener('click', add)
subtractBtn.addEventListener('click', subtract)
multiplyBtn.addEventListener('click', multiply)
divideBtn.addEventListener('click', divide)

// addBtn.addEventListener('click', calculate.bind(this, "ADD"));
// subtractBtn.addEventListener('click',  calculate.bind(this, "SUBTRACT"))
// multiplyBtn.addEventListener('click',  calculate.bind(this, "MULTIPLY"))
// divideBtn.addEventListener('click',  calculate.bind(this, "DIVIDE"))

// Methods
/*
    Comment with many lines
 */

function getUserInput() {
    return parseInt(userInput.value);
}

function calculate(operation, number1, number2) {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    let operator;

    switch (operation) {
        case "ADD":
            add(number1, number2);
            operation = '+';
            break;
        case "SUBTRACT":
            subtract(number1, number2);
            operation = '-';
            break;
        case "MULTIPLY":
            multiply(number1, number2);
            operation = '*';
            break;
        case "DIVIDE":
            divide(number1, number2);
            operation = '/';
            break;
    }

    createAndWriteOutput(operator, initialResult, currentResult);
    writeToLog(operation, initialResult, enteredNumber, currentResult)
}

function add(number1, number2) {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;

    currentResult += enteredNumber;

    createAndWriteOutput('+', initialResult, currentResult);
    writeToLog("ADD", initialResult, enteredNumber, currentResult)
}

function subtract(number1, number2) {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;

    currentResult -= enteredNumber;

    createAndWriteOutput('-', initialResult, currentResult);
    writeToLog("SUBTRACT", initialResult, enteredNumber, currentResult)
}

    function multiply(number1, number2) {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;

    currentResult *= enteredNumber;

    createAndWriteOutput('*', initialResult, currentResult);
    writeToLog("MULTIPLY", initialResult, enteredNumber, currentResult)
}

function divide(number1, number2) {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;

    currentResult /= enteredNumber;

    createAndWriteOutput('/', initialResult, currentResult);
    writeToLog("DIVIDE", initialResult, enteredNumber, currentResult)
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;

    outputResult(currentResult, calcDescription);
}

function writeToLog(operatorIdentifier, prevResult, operationNumber, newResutl) {
    logEntries.push({
            operation : operatorIdentifier,
            previousResult : prevResult,
            number : operationNumber,
            result : newResutl
        }
    );

    console.log(logEntries[logEntries.length - 1 ]);
}

function addAndAlert(number1, number2) {
    let result = number1 + number2;
    alert("The result is " + result);
}