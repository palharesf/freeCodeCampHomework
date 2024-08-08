// Exercise Permalink: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/build-a-cash-register-project/build-a-cash-register

script.js

let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

const cashObj = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

purchaseBtn.addEventListener("click",()=>{
  let cash = parseFloat(cashObj.value);
  let totalCid = cidSum();
  let change = calcChange(cash);
  let result = changeCheck(change,cid,totalCid);
  const formattedChange = result.changeArray.map(([name, amount]) => {
  return `${name}: $${amount.toFixed(2)}`;
}).join(', ');

  console.log("Cash: ",cash);
  console.log("totalCid: ",totalCid);
  console.log("Change: ",change);
  console.log("Result: ",result);
  console.log("formattedChange: ", formattedChange);

  if (change < 0){
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (change === 0){
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  } else {
    if (result.status === "INSUFFICIENT_FUNDS") { 
      changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
      //console.log("case Status: INSUFFICIENT FUNDS");
      return;
    } else if (result.status === "CLOSED") {
      changeDue.textContent = `Status: CLOSED
      ${formattedChange}`;
      changeDue.textContent += ``
      //console.log("case Status: CLOSED");
      return;
    } else {
      changeDue.textContent = `Status: OPEN
      ${formattedChange}`;
      //console.log("case Status: OPEN");
      return;
    }    
    return;
  }
});

const cidSum = ()=>{
  let total = 0;
  for (let i = 0; i < cid.length; i++) {
    total += Math.round(cid[i][1] * 100); // Convert to cents
  }
  return total / 100; // Convert back to dollars
};

const calcChange = cash => {
  return Math.round((cash - price) * 100) / 100; // Convert to cents, subtract, then convert back to dollars
};

const changeCheck = (changeDue, cid, totalCid) => {
  //console.log("Into changeCheck");
  const denominations = [
    { name: "ONE HUNDRED", value: 100 },
    { name: "TWENTY", value: 20 },
    { name: "TEN", value: 10 },
    { name: "FIVE", value: 5 },
    { name: "ONE", value: 1 },
    { name: "QUARTER", value: 0.25 },
    { name: "DIME", value: 0.1 },
    { name: "NICKEL", value: 0.05 },
    { name: "PENNY", value: 0.01 }
  ];
  let changeArray = [];
  if (totalCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", changeArray: [] };
  }
  if (totalCid === changeDue) {
    changeArray = cid.filter(([name, amount]) => amount > 0);
    return { status: "CLOSED", changeArray };
  }
  let cidCopy = cid;
  for (let { name, value } of denominations) {
    let amount = 0;
    while (changeDue >= value && cidCopy.find(elem => elem[0] === name)[1] >= value) {
      changeDue -= value;
      changeDue = Math.round(changeDue * 100) / 100;
      amount += value;
      amount = Math.round(amount * 100) / 100;
      cidCopy.find(elem => elem[0] === name)[1] -= value;
    }
    if (amount > 0) {
      changeArray.push([name, amount]);
    }
  }
  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", changeArray: [] };
  }
  console.log("ChangeArrayBefore: ",changeArray);
  changeArray = changeArray.filter(([name, amount]) => amount > 0);
  console.log("ChangeArrayAfter: ",changeArray);
  return { status: "OPEN", changeArray };
};





index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cash Register</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main>
      <form action="/submit" method="post">
  <label for="user-input">Cash:</label>
  <input type="text" name="user-input" id="cash" placeholder="Type the cash amount">
  <button type="button" id="purchase-btn">Purchase</button>
  <button type="button" id="clear-btn">Clear</button>
</form>
      <div id="change-due"><div>
    </main>
    <script src="./script.js"></script>
  </body>
</html>


