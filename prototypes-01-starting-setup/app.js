class AgedPerson {
    printAge(){
        console.log(this.age)
    }
}

class Person extends AgedPerson{
    name = 'Max';

    constructor() {
        super();
        this.age = 30;
    }

    // greet = () =>{
    //
    //     console.log('Hi, I am ' + this.name + ' my age is ' + this.age);
    // }
    
    greet(){
        console.log('Hi, I am ' + this.name + ' my age is ' + this.age);
    }
}
//
// function Person() {
//     this.age = 30;
//     this.name = 'Max';
//     this.greet = function () {
//         console.log('Hi, I am ' + this.name + ' my age is ' + this.age);
//     };
//
// }
//
// function Thing() {
//     this.age = 20;
//     this.name = 'Zuza';
//     this.greet = function () {
//         console.log('Hi, I am ' + this.name + ' my age is ' + this.age);
//     };
//
// }
//
// Person.prototype.printAge = function () {
//     console.log(this.age);
// };

// const person = new Person();
// person.greet();
// person.printAge();
// console.log(person.__proto__);
// console.log(person.toString())
//
// const p2 = new person.__proto__.constructor();
// console.log(person);
// console.log(p2);
// console.log(p2.prototype === person.prototype);




const person = new Person();
const person2 = new Person();

person.greet();
console.log(person.__proto__ === person2.__proto___);
console.log(person);

const button = document.getElementById('btn');
button.addEventListener('click', person.greet.bind(person));

const course = {
    title: 'JavaScript',
    rating: 5,
}; // new Object


console.log(course.__proto__);
console.log(Object.getPrototypeOf(course));
Object.setPrototypeOf(course, {
    ...Object.getPrototypeOf(course),
    printRating: function () {
        console.log(`${this.rating}/5`);
    },
});

course.printRating();


const student = Object.create({printProgress: function () {
        console.log(this.progress);
    }}, {
    name: {
        configurable: true,
        enumerable: true,
        value: 0.8,
        writable: false    
    }
});
student.name = 'Zuza';
Object.defineProperty(student, 'progress', {
    configurable: true,
    enumerable: true,
    value: 0.8,
    writable: false
})
;
console.log(student);
student.printProgress();