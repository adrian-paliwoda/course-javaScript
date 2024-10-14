const assignment1 = () => {
    const arrayNumber = [1, 3, 2312, 30, 14, 20, 50, 299];
    const greaterThanFive = arrayNumber.filter(number => number > 5);

    const objectNumber = arrayNumber.map(p => {
        return {number: p}
    })
    const multiply = arrayNumber.reduce((previousValue, currentValue) => previousValue * currentValue, 1);

    console.log(arrayNumber);
    console.log(greaterThanFive);
    console.log(objectNumber);
    console.log(multiply);
}

const findMax = (split1, split2) => {
    const arrayOfNumber = split1.concat(split2);
    return Math.max(...arrayOfNumber);
}

const findMaxAndMin = (split1, split2) => {
    const arrayOfNumber = split1.concat(split2);

    const max = Math.max(...arrayOfNumber);
    const min = Math.min(...arrayOfNumber);

    return [min, max];
}

const assignment2 = () => {
    const split1 = [1, 3, 2312, 30, 14, 20, 50, 299];
    const split2 = split1.splice(0, 5);

    const max = findMax(split1, split2);

    console.log(max)
}

const assignment3 = () => {
    const split1 = [1, 3, 2312, 30, 14, 20, 50, 299];
    const split2 = split1.splice(0, 5);

    const [min, max] = findMaxAndMin(split1, split2);

    console.log(min);
    console.log(max);
}

const assignment4 = () => {
    const set = new Set();
    const valueToAdd = 4;
    set.add(valueToAdd);
    set.add(valueToAdd);

    // if (!set.has(valueToAdd)) {
    //     set.add(valueToAdd);
    // }

    console.log(set);
}



assignment1()
assignment2()
assignment3()
assignment4()