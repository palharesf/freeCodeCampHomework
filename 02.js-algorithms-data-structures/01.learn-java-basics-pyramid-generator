// Exercise permalink: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/learn-introductory-javascript-by-building-a-pyramid-generator/step-1

// Single-line comments start with two forward-slashes. Multi-line comments start with /* and end with */

/* Declaring a variable means giving it a name. In JavaScript, this is often done with the 'let' keyword. For example, here is how you would declare a hello variable: 'let hello;'
You can assign a value using the assignment operator =. For example: 'let hello = "Hello";' -- assigning a value to a variable at the moment of its declaration is known as initialization;
'let' variables can be changed. For this project we should use const to declare them. const variables are special. A const variable cannot be reassigned like a let variable, and cannot be uninitialized
An array is a non-primitive data type that can hold a series of values. Non-primitive data types differ from primitive data types in that they can hold more complex data. Primitive data types like strings and numbers can only hold one value at a time. An empty array declaration goes like this: 'let rows = [];'
When an array holds values, or elements, those values are separated by commas. Example: 'let array = ["first", "second"];'
You can access the values inside an array using the index of the value. An index is a number representing the position of the value in the array, starting from 0 for the first value. You can access the value using bracket notation, such as array[0]
You can make use of the .length property of an array - this returns the number of elements in the array. To get the last element of any array, you can use the following syntax: 'array[array.length - 1]' */

const character = "!";
const count = 10;
const rows = [];
let inverted = false;

/* A method in JavaScript is a function that's associated with certain values or objects. Arrays have their own methods, and the first you will explore is the .push() method. This allows you to "push" a value to the end of an array
Another method essential for this project is the .pop() method. It removes the last element from an array and returns that element. When a method returns a value, you can think of it as giving the value back to you, making it available for use in other parts of your code
The .push() method returns the new length of the array, after adding the value you give it. 
The .repeat() is available to strings, accepts a number as an argument, specifying the number of times to repeat the target string. Example: 'const activity = "Code! "; activity.repeat(3);'
The .unshift() method of an array allows you to add a value to the beginning of the array, unlike .push() which adds the value at the end of the array. .unshift() returns the new length of the array it was called on
Arrays also have a .shift() method. This will remove the first element of the array, unlike .pop() which removes the last element
A function is a block of code that can be reused throughout your application. Functions are declared with the following syntax: 'function name(parameter) {}'
An important thing to know about the return keyword is that it does not just define a value to be returned from your function, it also stops the execution of your code inside a function or a block statement. This means any code after a return statement will not run */

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

/* 'for' loops use the following syntax: for (iterator; condition; iteration) {  logic;}
A 'for...of' loop iterates over each item in an iterable object and temporarily assigns it to a variable. The syntax for a for...of loop looks like: 'for (const value of iterable) {}'
You can use the addition assignment operator: 'test += 1;' has in prapctice the same effect as 'test = test + 1;'. If the increment is only by one, you can use the increment operator instead of addition assignment operator: 'let test = 7; test++' */

for (let i = 1; i <= count; i++) {
  if (inverted) { 								// A truthy value is a value that is considered true when evaluated as a boolean. Most of the values you encounter in JavaScript will be truthy. A falsy value is the opposite - a value considered false when evaluated as a boolean. JavaScript has a defined list of falsy values. Some of them include 'false', '0', '""', 'null', 'undefined', and 'NaN'. For an if statement, if we don't use an equality operator, the if will try to see if the argument is truthy or falsy
    rows.unshift(padRow(i, count));
  } else {
    rows.push(padRow(i, count));
  }
}

let result = ""

// To insert a new line, you need to use the special escape sequence \n, which is interpreted as a new line when the string is logged. Example: 'lineOne = lineOne + "\n" + lineTwo;'

for (const row of rows) {
  result = result + "\n" + row;
}

// The console allows you to print and view JavaScript output. You can send information to the console using console.log(). For example, this code will print "Naomi" to the console: 'let developer = "Naomi"; console.log(developer);'

console.log(result);

// The strict equality operator === is used to check if two values are equal and share the same type. As a general rule, this is the equality operator you should always use. With the strict equality operator, "0" === 0 becomes false, because while they might have the same value of zero, they are not of the same type
// The strict inequality operator !== allows you to check if two values are not equal, or do not have the same type. The syntax is similar to the equality operator: value !== 4