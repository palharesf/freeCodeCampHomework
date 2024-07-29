// Exercise permalink: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/learn-functional-programming-by-building-a-spreadsheet/step-1

script.js

const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
}

const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));		// If you have a function parameter that is not being used, it's common convention to prefix it with an underscore (e.g. _match)

const highPrecedence = str => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
}

const isEven = num => num % 2 === 0;
const sum = nums => nums.reduce((acc, el) => acc + el, 0);
const average = nums => sum(nums) / nums.length;

const median = nums => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];											// The same way Math.floor() rounds down a value, Math.ceil() rounds it up
}

const spreadsheetFunctions = {
  "": arg=>arg,
  sum,
  average,
  median,
  even: nums => nums.filter(isEven),
  someeven: nums => nums.some(isEven),
  everyeven: nums => nums.every(isEven),
  firsttwo: nums => nums.slice(0, 2),
  lasttwo: nums => nums.slice(-2),
  has2: nums => nums.includes(2),
  increment: nums => nums.map(num => num + 1),
  random: ([x, y]) => Math.floor(Math.random() * y + x),
  range: nums => range(...nums),
  nodupes: nums => [...new Set(nums).values()]
}

const applyFunction = str => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix);
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = args => args.split(",").map(parseFloat);
  const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
}

const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);					// The Array() constructor has a .fill() method which can be used to fill an array with a value. You can use this to fill your array with the start value
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));		// The range function expects numbers, but the start and end values will be strings (specifically, they will be single characters such as A). We can convert the start and end values in the range() call to numbers by using the .charCodeAt() method on them, passing the number 0 as the argument to that method. To get the letter back from the Unicode value, we can use the String.fromCharCode() method

const evalFormula = (x, cells) => {
  const idToText = id => cells.find(cell => cell.id === id).value;
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
  const elemValue = num => character => idToText(character + num);
  const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));			// You can immediately invoke the return result of a function if it takes another argument to call the function again. For instance, '.map(addCharacters(char1)(char2))' calls addCharacters with the argument char2 once it returns from the call with the argument char1
  const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
  const functionExpanded = applyFunction(cellExpanded);
  return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
}

window.onload = () => {																										// The global window object represents the browser window (or tab). It has an onload property which allows you to define behavior when the window has loaded the entire page, including stylesheets and scripts
  const container = document.getElementById("container");
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  }
  const letters = charRange("A", "J");
  letters.forEach(createLabel);
  range(1, 99).forEach(number => {
    createLabel(number);
    letters.forEach(letter => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      input.onchange = update;
      container.appendChild(input);
    })
  })
}

const update = event => {
  const element = event.target;
  const value = element.value.replace(/\s/g, "");
  if (!value.includes(element.id) && value.startsWith('=')) {
    element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
  }
}






index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Functional Programming Spreadsheet</title>
  </head>
  <body>
    <div id="container">
      <div></div>
    </div>
    <script src="./script.js"></script>
  </body>
</html>




styles.css

#container {
  display: grid;
  grid-template-columns: 50px repeat(10, 200px);
  grid-template-rows: repeat(11, 30px);
}

.label {
  background-color: lightgray;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
}



