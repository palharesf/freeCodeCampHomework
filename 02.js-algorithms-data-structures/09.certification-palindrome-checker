// Exercise permalink: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/build-a-palindrome-checker-project/build-a-palindrome-checker

script.js

const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");
let inputValue = "";
let isPalindrome;

checkButton.addEventListener("click",checkEntry);

function checkEntry() {
  inputValue = textInput.value;
  console.log("Input value:", inputValue);
  
  if(inputValue === "") {
    alert("Please input a value");
    return;
  }
  else {
    isPalindrome = palindromeCheck(inputValue);
    if (isPalindrome) {
      result.textContent = `${inputValue} is a palindrome`;
      return;
    } else {
      result.textContent = `${inputValue} is not a palindrome`;
      return;
    }
    //console.log("Palindrome check: ", isPalindrome);
  }
};

function palindromeCheck(text) {
  const textString = text.split("");
  const filteredString = textString.filter(function(char) {
    return /[a-zA-Z0-9]/.test(char);
  }).map(function(char) {
    return char.toLowerCase();
  });
  const reversedString = [...filteredString].reverse();
  // console.log("Original String: ", textString);
  // console.log("Filtered String: ", filteredString);
  // console.log("Reversed String: ", reversedString);
  if(filteredString.join('') === reversedString.join('')){
    return true;
  } else {
    return null;
  }
}




index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Palyndrome Checker</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main>
      <form action="/submit" method="post">
  <label for="text-input">Palindrome:</label>
  <input type="text" name="text-input" id="text-input" placeholder="Type the palindrome to check">
  <button type="button" id="check-btn">Check!</button>
</form>
      <div id="result"><div>
    </main>
    <script src="./script.js"></script>
  </body>
</html>