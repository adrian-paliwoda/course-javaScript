

// TASK 1
while (true) {
    const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)

    if (randomNumber > 0.7) {
        alert("Random number is grater than 0.7 " + randomNumber );
        break;
    }

}



// TASK 2 and 3

let arrayOfNumbers = [1,121,2112,12321,1111,213123];

for (const number of arrayOfNumbers) {
    console.log(number);
}

for (let i = arrayOfNumbers.length - 1; i >= 0; i--){ // edited for task 3
    console.log(arrayOfNumbers[i]);
}


// TASK 4
while (true) {
    const randomNumber_0 = Math.random(); // produces random number between 0 (including) and 1 (excluding)
    const randomNumber_1 = Math.random(); // produces random number between 0 (including) and 1 (excluding)

    if (randomNumber_0 > 0.7 && randomNumber_1 > 0.7
        || (randomNumber_0 <= 0.2 || randomNumber_1 <= 0.2)) {
        alert("Random numbers is grater than 0.7 OR one of them is NOT greater than 0.2: 0 => " + randomNumber_0 + "1 => " + randomNumber_1);
        break;
    }

}
