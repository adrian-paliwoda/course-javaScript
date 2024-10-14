const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Gets input from input field
function getUserNumberInput() {
  return parseInt(usrInput.value);
}

// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor file
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResult(calculateType) {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  let operator = '';

  calculateType = calculateType.toLowerCase();

  if (calculateType === 'add') {
    currentResult += enteredNumber;
    operator = '+';
  }
  else if (calculateType === 'subtract') {
    currentResult -= enteredNumber;
    operator = '-';
  }
  else if (calculateType === 'multiply') {
    currentResult *= enteredNumber;
    operator = '*';
  }
  else if (calculateType === 'divide' || calculateType === 'div') {
    currentResult /= enteredNumber;
    operator = '/';
  }
  else
  {
    return;
  }

  createAndWriteOutput(operator, initialResult, enteredNumber);
  writeToLog(calculateType.toUpperCase(), initialResult, enteredNumber, currentResult);

}

function add() {
  calculateResult('add');
}

function subtract() {
calculateResult('subtract')}

function multiply() {
calculateResult('multiply')}

function divide() {
calculateResult('divide')
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);