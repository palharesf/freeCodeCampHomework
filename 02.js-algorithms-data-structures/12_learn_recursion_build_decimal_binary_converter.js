// Exercise permalink: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/learn-recursion-by-building-a-decimal-to-binary-converter/step-1

script.js

/* Placeholder: Old decimalToBinary function

const decimalToBinary = (input) => {
  const inputs = [];
  const quotients = [];
  const remainders = [];

  if (input === 0) {
    result.innerText = "0";
    return;
  }

  while (input > 0) {
    const quotient = Math.floor(input / 2);
    const remainder = input % 2;

    inputs.push(input);
    quotients.push(quotient);
    remainders.push(remainder);
    input = quotient;
  }

  console.log("Inputs: ", inputs);
  console.log("Quotients: ", quotients);
  console.log("Remainders: ", remainders);

  result.innerText = remainders.reverse().join("");
}; */

const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");
const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: 'decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];

const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);			// Division in JS is done either by the '/' symbol, denoting floating-point division, or '%', which returns remainder division
  }
};

const showAnimation = () => {
  result.innerText = "Call Stack Animation";

  animationData.forEach((obj) => {
    setTimeout(() => {														// The setTimeout function takes two arguments: a callback function and a number representing the time in milliseconds to wait before executing the callback function
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  setTimeout(() => {
result.textContent = decimalToBinary(5);
  }, 20000);
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);								// A good way to check and normalize numbers in JavaScript is to use the built-in parseInt() function, which converts a string into an integer or whole number. parseInt() takes at least one argument, a string to be converted into an integer, and returns either an integer or NaN which stands for Not a Number

  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {				// Rather than check if a value is equal to a falsy value, you can use the logical NOT operator (!) to check if the value itself is falsy. For example, 'console.log(!num);' // Next, you need to check if the value returned by the parseInt() function is a number or not. To do that, you can use the isNaN() function. This function takes in a string or number as an argument, and returns true if it evaluates to NaN
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  if (inputInt === 5) {
    showAnimation();
    return;
  }

  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {							// The keydown event fires every time a user presses a key on their keyboard, and is a good way to add more interactivity to input elements
  if (e.key === "Enter") {													// Taking a closer look at one of those event objects, you'll see helpful properties like type and target. Since you want to perform an action when the Enter key is pressed, the most helpful property is key, which tells you the string value of the key that was pressed
    checkUserInput();
  }
});






index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Decimal to Binary Converter</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Decimal to Binary Converter</h1>
    <div class="input-container">
      <label for="number-input">Enter a decimal number:</label>
      <input
        value=""
        type="number"
        name="decimal number input"
        id="number-input"
        class="number-input"
      />
      <button class="convert-btn" id="convert-btn">Convert</button>
    </div>
    <output id="result" for="number-input"></output>
    <div id="animation-container"></div>
    <script src="script.js"></script>
  </body>
</html>





styles.css

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --light-grey: #f5f6f7;
  --dark-blue: #1b1b32;
  --orange: #f1be32;
}

body {
  background-color: var(--dark-blue);
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  color: var(--light-grey);
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  font-size: 2.3rem;
  margin: 20px 0;
}

.input-container {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.convert-btn {
  background-color: var(--orange);
  cursor: pointer;
  border: none;
  padding: 4px;
}

.number-input {
  height: 25px;
}

#result {
  margin: 10px 0;
  min-width: 200px;
  width: fit-content;
  min-height: 80px;
  word-break: break-word;
  padding: 15px;
  border: 5px solid var(--orange);
  font-size: 2rem;
  text-align: center;
}

#animation-container {
  margin: auto;
  max-width: 300px;
}

.animation-frame {
  margin: 250px auto 0;
  padding: 15px 10px;
  border: 5px solid var(--orange);
  font-size: 1.2rem;
  text-align: center;
}

@media screen and (min-width: 500px) {
  .input-container {
    flex-direction: row;
  }

  #result {
    max-width: 460px;
  }
}

