// not related to game
// rest operator
const sumUp = (resultHandler, ...numbers) => {
    const message = "The result after sum all numbers is:";
    let sum = 0;

    for (const number of numbers) {

        sum += validateNumber(number);
    }
    return resultHandler(message, sum);
}

const subtractUp = function(resultHandler, ...arguments) {
    const message = "The result after sum all numbers is:";
    let sum = 0;

    for (const num of arguments) { // don't use that
        sum -= validateNumber(num);
    }
    return resultHandler(message, sum);
}

const combine = (operator, resultHandler, ...numbers) => {
    let message = "The result after sum all numbers is:";
    let result = 0;

    if (operator === SUBTRACT) {
        message = "The result after subtract all numbers is:";
    }

    for (const number of numbers) {
        if (operator === ADD) {
            result += validateNumber((number));
        }
        else if (operator === SUBTRACT) {
            result -= validateNumber(number);
        }
        else {
            result = validateNumber(number);
        }
    }

    resultHandler(result);
}

const validateNumber = (number) =>
{
    return isNaN(number) ? 0 : number;
}


const showResults = (messageText = "The result after sum all numbers is:", sum) => {
    // alert("The result after sum all numbers is: " + sum);
    console.log(messageText + " " + sum);
}

const resultHandler = (messageText, sum) => {
    // alert("The result after sum all numbers is: " + sum);
    console.log(messageText + " " + sum);
}

sumUp(showResults,3,5,6);
sumUp(showResults,3,5,6,6,-1);
subtractUp(showResults, 123, 22, 32, 1);

combine(ADD,resultHandler.bind(this, "The result after sum all numbers is:"), 123, 22, 32, 1);
combine(SUBTRACT,resultHandler.bind(this, "The result after subtract all numbers is:"), 123, 22, 32, 1);
