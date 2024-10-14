
export const example_0 = () => {
const numbers = [1, 2, 3];
const moreNumbers = new Array('Hi', 'Welcome');
const moreNumbers2 = new Array(4);
const yetMoreNumbers = Array.of(numbers);
const numbers2 = Array.from('numbers');

console.log(moreNumbers2)
console.log(yetMoreNumbers);
}

export const splice_0 = () => {

    const hobbies = ["Sports", "Cooking"];
    hobbies.push("Reading");
    hobbies.unshift("Codding");

    const lastOne = hobbies.pop();
    const firstOne = hobbies.shift();

    console.log(firstOne);
    console.log(lastOne);
    console.log(hobbies);

    hobbies[1] = 'Codding';
    hobbies.push('photography')
    hobbies[5] = 'Hiking';
    console.log(hobbies);

    const removed = hobbies.splice(1,1,'Books', 'Movies');
    console.log(hobbies);
    console.log(removed);
}
export const slice_0 = () =>
{
    const testResults = [1, 5.3, 1.5, 20.44, -2, 10];

    let sliceResult = testResults.slice();
    sliceResult[0] = 99999;
    testResults.push(57);

    console.log(testResults);
    console.log(sliceResult);

    let sliceRangeResults = testResults.slice(2,5);
    sliceRangeResults.push(23);

    console.log(testResults);
    console.log(sliceRangeResults);
}

export const concat_0 = () =>{
    const testResults = [1,432.32,23.11,12,1231.1]
    const testResults2 = [1,21,1,-2,21,532];

    let concat = testResults.concat(testResults2);

    console.log(concat);
}

export const index = () => {
    const testResults = [1,432.32,23.11,12,1231.1]
    const index = testResults.indexOf(23.11);
    const lastIndex = testResults.lastIndexOf(23.11);

    console.log(index);
}

export const find = () =>{
    const testData = [{name: "Max"}, {name: "Manuel"}];
    const found = testData.find((p, i, persons) => p.name === "Manuel");
    const foundIndex = testData.findIndex(p => p.name === "Manuel");

    console.log(found);
    found.name = 'Anna';

    console.log(foundIndex);

    console.log(testData);
}

export const isIncluded = () => {
    const testData = [{name: "Max"}, {name: "Manuel"}];
    const testResults = [1,432.32,23.11,12,1231.1]

    const result = testData.includes(p => p.name === "Max");
    const result2 = testResults.includes(1);

    console.log(testData);
    console.log(result);

    console.log(testResults);
    console.log(result2);
}

export const forEachLoop = () => {
    const testData = [{name: "Max"}, {name: "Manuel"}];
    const testResults = [1, 2321, 323.23, 22, 2, 1.2];

    testResults.forEach( (value, index, array) => {
        console.log("Index " + index + ": " + value);
    })

    testData.forEach( (value, index, array) => {
        console.log("Name: " + value.name)
    })
}

export const map = () => {
    const testData = [{name: "Max"}, {name: "Manuel"}];
    const testResults = [1, 2321, 323.23, 22, 2, 1.2];

    const newTestData = testData.map( (value, index, array) => {
        return {surname: value.name + " surname"}
    })

    const newTestResults = testResults.map((value, index, array) => value * 1.5)

    newTestData.forEach((value, index1, array) => {
        console.log("Name: " + value.surname)})

    newTestResults.forEach((value, index1, array) => {
        console.log(value)})
}

export const sorting = () => {
    const testData = [{name: "Max"}, {name: "Manuel"}];
    const testResults = [1, 2321, 323.23, 22, 2, 1.2];

    testResults.forEach((value) => {
        console.log(value);
    })

    const sorted = testResults.sort((a, b) =>
    {
        if (a > b){
            return 1;
        }else if (a === b){
            return 0;
        }
        return -1;
    });

    testResults.forEach((value) => {
        console.log(value);
    })

    sorted.forEach((value) => {
        console.log(value);
    })
}

export const filtering = () =>{
    const testNumbers = [1, 2321, 323.23, 22, 2, 1.2];

    const result = testNumbers.filter((value, index1) => value > 10);

    result.forEach(value => {
        console.log(value);
    })
}

export const reducing = () => {
    const testNumbers = [1, 1, 1, 1, 1, 1];
    const result = testNumbers.reduce((previousValue, currentValue, currentIndex, array) =>
        previousValue + currentValue
    , 0);

    console.log(result);
}

export const splitAndJoin = () => {
    const testNumbers = [1, 2321, 323.23, 22, 2, 1.2];
    const resultJoin = testNumbers.join(':');
    const split = resultJoin.split(':');


    console.log(resultJoin);
    console.log(split);
}

export const spreadOperator = () => {
    const testNumbers = [1, 2321, 323.23, 22, 2, 1.2];
    const copiedTestNumber = [...testNumbers];
    copiedTestNumber[0] = 0;

    const people = [{name: 'Adrian'}, {name: 'Zuza'}]
    const copiedPeople = [...people];

    copiedPeople.push({name: 'Arloy'})
    copiedPeople[0].name = 'Adrianek';

    console.log(testNumbers);
    console.log(copiedTestNumber);

    console.log(people);
    console.log(copiedPeople);
}

export const destructuring = () => {
    const nameData = ['Adrian', 'Pawel', 'Mr', 30];

    const [firstName, lastName, ...otherInformation] = nameData;

    console.log(firstName);
    console.log(lastName);
    console.log(otherInformation);
}

export const mapAndSet = () => {
    const map = new Map();
    map.set(1, "one");
    map.set(2, "two");

    const set = new Set();
    set.add("fish");
    set.add("rice");

    console.log(set.has('fish'));
    console.log(map.get(1));
    set.forEach(value => {
        console.log(value);
    })
}

export const weakMapAndSet = () =>{
    let person = {name: 'Adrian'};
    const people = new WeakSet();
    people.add(person);

    // can be garbage collected and it won't be in weakSet
    person = null;

    console.log(people);


}
