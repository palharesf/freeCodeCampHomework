// Exercise permalink: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/build-a-roman-numeral-converter-project/build-a-roman-numeral-converter

script.js

const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const outputPrint = document.getElementById("output");

let romanOutput = [];
let decimal = 0;

const romanPairs = [
  {
    roman: "M",
    arabic: 1000
  },
  {
    roman: "CM",
    arabic: 900
  },
  {
    roman: "D",
    arabic: 500
  },
  {
    roman: "CD",
    arabic: 400
  },
  {
    roman: "C",
    arabic: 100
  },
  {
    roman: "XC",
    arabic: 90
  },
  {
    roman: "L",
    arabic: 50
  },
  {
    roman: "XL",
    arabic: 40
  },
  {
    roman: "X",
    arabic: 10
  },
  {
    roman: "IX",
    arabic: 9
  },
  {
    roman: "V",
    arabic: 5
  },
  {
    roman: "IV",
    arabic: 4
  },
  {
    roman: "I",
    arabic: 1
  },
];

convertButton.addEventListener("click",numberCheck);

function numberCheck() {
  decimal = parseInt(numberInput.value);
  if(decimal === -1 || decimal < 0) {
    outputPrint.textContent = "Please enter a number greater than or equal to 1";
  } else if (decimal > 3999) {
    outputPrint.textContent = "Please enter a number less than or equal to 3999"
  } else if (!numberInput.value || isNaN(decimal)) {
    outputPrint.textContent = "Please enter a valid number";
  } else {
    conversionProcess();
    outputPrint.textContent = `${romanOutput.join("")}`;
  }
  romanOutput.length = 0;
  return;
};

function conversionProcess() {
  //console.log("Conversion Started");
  let quotient = 0;
  romanPairs.forEach((pair)=>{
    quotient = Math.floor(decimal/pair.arabic);
    //console.log("Old Decimal ", decimal);
    decimal -= quotient*pair.arabic;
    append(quotient,pair.roman);
    //console.log("Quotient: ",quotient);
    //console.log("New Decimal ", decimal);
    //console.log("Roman: ",romanOutput);
  });
  return;
};

function append(qty,quotient){
  let newArray = new Array(qty).fill(quotient);
  romanOutput = romanOutput.concat(newArray);
};






index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Roman Numeral Converter</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main>
      <form action="/submit" method="post">
  <label for="number-input">Decimal Number:</label>
  <input type="number" name="number-input" id="number" placeholder="Type the decimal number to convert">
  <button type="button" id="convert-btn">Convert!</button>
</form>
      <div id="output"><div>
    </main>
    <script src="./script.js"></script>
  </body>
</html>




