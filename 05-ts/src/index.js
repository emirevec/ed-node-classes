var hello = 'Hello world';
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.sayHello = function () {
        console.log("Hello, my name is ".concat(this.name, " "));
    };
    return Person;
}());
var Joe = new Person('Joe', 28);
Joe.sayHello();
