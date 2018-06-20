// // Class Person
// function Person(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
// }
//
// Person.prototype.greeting = function () {
//     return `Hello there ${this.firstName} ${this.lastName}`
// };
//
// const person1 = new Person('Denis', 'Teacher');
//
// console.log(person1);
// console.log(person1.greeting());
//
// // Class Customer
// function Customer(firstName, lastName, phone, membership) {
//     Person.call(this, firstName, lastName);
//     this.phone = phone;
//     this.membership = membership;
// }
// Customer.prototype = Object.create(Person.prototype);
// Customer.prototype.constructor = Customer;
//
// Customer.prototype.greeting = function () {
//     return `Hello there ${this.firstName} ${this.lastName} Wellcome`
// };
//
// const customer1 = new Customer('Ivan', 'Ivanov', '063-000-00-00', 'standart');
// console.log(customer1);
// console.log(customer1.greeting());
//
// let obj = {
//     metod: function () {
//
//     }
// };
// let obj2 = {
//     metod() {
//
//     }
// };

// Class ES6
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    greeting() {
        return `Hello there ${this.firstName} ${this.lastName}`;
    }
}

const person1 = new Person('Denis', 'Teacher');

class Customer extends Person {
    constructor(firstName, lastName, phone, membership) {
        super(firstName, lastName);
        this.phone = phone;
        this.membership = membership;
    }

    // greeting() {
    //     console.log(super.greeting());
    // }
}
const customer1 = new Customer('Ivan', 'Ivanov', '063-000-00-00', 'standart');

// console.log(person1);
// console.log(person1.greeting());
//
// console.log(customer1);
// console.log(customer1.greeting());
