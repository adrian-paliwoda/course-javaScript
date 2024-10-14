class Course {

    constructor(title, length, price) {
        this.title = title;
        this.Length = length;
        this.price = price;
    }

    get price(){
        return "$ " + this._price;
    }

    set price(value) {
        if (value && value > 0) {
            this._price = value;
        }
    }

    summary() {
        const summary = `
        Title ${this.title}
        Length ${this.Length}
        Price ${this.price}
        `

        console.log(summary);
    }

    calculateProfitability() {
        const profitability = this.Length / this._price;
        console.log(profitability);
    }
}


class PracticalCourse extends Course {
    constructor(title, length, price, numOfExercises) {
        super(title, length, price);
        this.numOfExercises = numOfExercises;
    }


    summary() {
        const summary = `
        Title ${this.title}
        Length ${this.Length}
        Price ${this.price}
        Number of Exercises ${this.numOfExercises}
        `

        console.log(summary);
    }

}

class TheoreticalCourse extends Course {
    constructor(title, length, price, numOfExercises) {
        super(title, length, price);
    }

    publish(){
        console.log("Teoretical Course: publish()");
    }
}

// Task 1
const course1 = new Course("CShapr course", 23, 123);
const course2 = new Course("TypeScript", 3, 13);


console.log(course1);
console.log(course2);

course1.summary();
course1.calculateProfitability()

course2.summary();
course2.calculateProfitability();




// Task 2
const practicalCourse = new PracticalCourse("Practise CSharp", 23, 123, 5);
const theoreticalCourse = new TheoreticalCourse("Practise CSharp", 23, 123);

practicalCourse.summary();
theoreticalCourse.publish();




// Task 3

console.log(course1.price);