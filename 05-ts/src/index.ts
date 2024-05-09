import { hello } from "./data/data"

console.log(hello)

class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name} `)
  }
}

const Joe = new Person('Joe', 28)

Joe.sayHello()
