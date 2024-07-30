// Exercise permalink: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/build-a-telephone-number-validator-project/build-a-telephone-number-validator

script.js

const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

// Code can probably be cleaned a bit. I need to double check if those variable declarations below need to be done at a global level, or if they can be done at a function level when needed

let validOrInvalid = "Invalid";
let numberDigits = 0;
const phoneRegex = /^1?\s?(\d{3}|\(\d{3}\))[\s-]?\d{3}[\s-]?\d{4}$/;

checkButton.addEventListener("click",numberCheck);

clearButton.addEventListener("click",clearScreen)

function numberCheck(){
  console.log("UserInput: ",userInput.value);
  if(userInput.value.trim() === "") {
    alert("Please provide a phone number");				// In terms of cleanliness, it probably would make sense to clear the resultsDiv.textContent around here, so if an invalid number alert is triggered, the screen would clear
  } else {
    numberDigits = userInput.value.replace(/\D/g, '').length;
    console.log("Number Digits: ",numberDigits)
    if (numberDigits === 11){
      let firstDigit = userInput.value.trim()[0];
      console.log("First Digit: ",firstDigit)
      if (firstDigit === "1") {
        formatCheck();
      } else {
        validOrInvalid = "Invalid";
      }
    } else if (numberDigits === 10){
      formatCheck();
    } else {
      validOrInvalid = "Invalid";
    }
  }
  resultsDiv.textContent = `${validOrInvalid} US number: ${userInput.value}`		//  In terms of cleanliness, it probably would be better to have this update routine separately in a function and not being called everytime the mouse is clicked on the event listener. It's functional but it's ugly/misleading
  return;
};

function clearScreen(){
  resultsDiv.textContent = "";
  userInput.value = "";
  numberDigits = 0;
  return;
};

function formatCheck(){
  console.log("Match Regex?");
  console.log(userInput.value.match(phoneRegex));
  if (userInput.value.match(phoneRegex)) {
    validOrInvalid = "Valid";
  } else {
    validOrInvalid = "Invalid";
  }
};






index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Phone Number Validator</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main>
      <form action="/submit" method="post">
  <label for="user-input">Phone Number:</label>
  <input type="text" name="user-input" id="user-input" placeholder="Type the phone number">
  <button type="button" id="check-btn">Validate</button>
  <button type="button" id="clear-btn">Clear</button>
</form>
      <div id="results-div"><div>
    </main>
    <script src="./script.js"></script>
  </body>
</html>


