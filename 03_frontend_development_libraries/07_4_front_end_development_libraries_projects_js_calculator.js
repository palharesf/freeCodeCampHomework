// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator
// Codepen link: https://codepen.io/fernandopa/pen/vYqqrZb

// Project finished. Overall, super difficult. While previous projects took one, mostly two coding days, this one took almost five full days. Implementing the immediate execution logic and handling negative sign (is it an operator or a negative number?) were both very difficult, but carefully trackign the state evolution allowed me to zero in on the boundary/edge conditions

// Setting up external dependencies

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux"
import { Provider, connect } from "https://esm.sh/react-redux";

// Layout: one parent container, five rows. First row is display (across all columns), second row is numbers 1 through 5, third row is numbers 6 through 0, fourth row is operations and equals, last row is clear with 80% column width and decimal point with 20% column width

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.clearScreenBtn = this.clearScreenBtn.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

// clearScreenBtn was reasonably easy, just reset the state to initialState and attach it to the AC button  
  clearScreenBtn() {
    //console.log("Clear Screen Btn pressed");
    const { clearMemory, updateDisplay, updateOperator, setValueOne, updateLastPress } = this.props;
    clearMemory();
    updateDisplay(0);
    updateOperator("");
    setValueOne(null);
    updateLastPress("Clear");
  }

// handleNumber was generally easy as well, although one edge case had to be added towards the end - if the state tells the negativeFlag is raised, that means this coming number is negative. Simple solution after all, but took a while to arrive at it  
  handleNumber(num) {
    //console.log("Number pressed");
    const { addDigit, updateLastPress, negFlag, resetNegFlag } = this.props;
    
    if (negFlag) {
      console.log("num", num);
      num = -num;
      console.log("num", num);
      resetNegFlag();
    }
    addDigit(num);
    updateLastPress("Number");
  }

// handleDecimal was also easy - to avoid one number having multiple decimal points, we just need to look into our currentValue array and see if we find any decimals there already, in which case we skip the method's execution  
  handleDecimal() {
    const { lastPress, currentValue, addDigit, updateLastPress } = this.props;
    if(lastPress === "Decimal") {
      return;
    } else if(currentValue.includes(".")) {
      return;
    } else {
      addDigit(".");
    }
    updateLastPress("Decimal");
  }

// handleOperator was the bane of my existence. The edge cases we needed to manage at the end are: how to treat the minus sign differently from the other operators (is it an operator or a negative number that's about to come?), how to handle a second operator in the same sentence (i.e. immediate execution). The implementation was easy, but figuring out the logic was really problematic
  handleOperator(opr) {
    const { currentValue, lastPress, updateOperator, updateDisplay, updateLastPress, valueOne, setValueOne, computeOperation, setDNR, setNegFlag, resetNegFlag } = this.props;
    
    setDNR();
    if (lastPress === "Operator" && opr !== "SUBTRACT") {
      updateOperator(opr);
      updateLastPress("Operator");
      resetNegFlag();
      return;
    } else if (lastPress === "Operator" && opr === "SUBTRACT") {
      setNegFlag();
      updateLastPress("Operator")
      return;
    }
    
    if (valueOne === null) {
      setValueOne(parseFloat(currentValue.join('')));
    } else {
      computeOperation();
    }
    updateOperator(opr);
    updateLastPress("Operator");
  }

// handleEquals is very straightforward. computeOperation is already hooked in a way that it clears the memory and move variables around, so the method itself could be very simple  
  handleEquals() {
    const { computeOperation, updateLastPress } = this.props;
    
    computeOperation();
    updateLastPress("Equal");
  }

// componentDidUpdate was the lifecycle method that saved my life. I was able to update the display every time there was a change to the state, except when I wanted to avoid this update (using flagDNR i.e. flag Do Not Refresh). It was also a perfect place to add console logs and monitor the code execution  
  componentDidUpdate(prevProps) {
    const { updateDisplay, currentValue, flagDNR, resetDNR } = this.props;
    
    //console.log("-----");
    
    if (prevProps.currentValue !== currentValue && !flagDNR) {
      if (currentValue.length > 0) {
        let num;
        if (currentValue.length === 1 && currentValue[0] === 0) {
          num = 0;
        } else if (currentValue.includes(".")) {
          num = currentValue.join('');
        } else {
          num = parseFloat(currentValue.join(''));
        }
        updateDisplay(num);
      }
    }
    resetDNR();
  }

// render was my first focus for this exercise, and generally was easy compared to handling the methods and the reducer  
  render(){
    const { display } = this.props;
    return(
      <div class="container">
        <div id="row-1" class="row text-end">
          <div id="display" class="col border">{display}</div>
        </div>
        <div id="row-2" class="row text-center">
          <button type="button" id="one" class="col border" onClick={() => this.handleNumber(1)}>1</button>
          <button type="button" id="two" class="col border" onClick={() => this.handleNumber(2)}>2</button>
          <button type="button" id="three" class="col border" onClick={() => this.handleNumber(3)}>3</button>
          <button type="button" id="four" class="col border" onClick={() => this.handleNumber(4)}>4</button>
          <button type="button" id="five" class="col border" onClick={() => this.handleNumber(5)}>5</button>
        </div>
        <div id="row-3" class="row text-center">
          <button type="button" id="six" class="col border" onClick={() => this.handleNumber(6)}>6</button>
          <button type="button" id="seven" class="col border" onClick={() => this.handleNumber(7)}>7</button>
          <button type="button" id="eight" class="col border" onClick={() => this.handleNumber(8)}>8</button>
          <button type="button" id="nine" class="col border" onClick={() => this.handleNumber(9)}>9</button>
          <button type="button" id="zero" class="col border" onClick={() => this.handleNumber(0)}>0</button>
        </div>
        <div id="row-4" class="row text-center">
          <button type="button" id="add" class="col border" onClick={() => this.handleOperator("ADD")}>+</button>
          <button type="button" id="subtract" class="col border" onClick={() => this.handleOperator("SUBTRACT")}>-</button>
          <button type="button" id="multiply" class="col border" onClick={() => this.handleOperator("MULTIPLY")}>*</button>
          <button type="button" id="divide" class="col border" onClick={() => this.handleOperator("DIVIDE")}>/</button>
          <button type="button" id="equals" class="col border" onClick={() => this.handleEquals()}>=</button>
        </div>
        <div id="row-5" class="row"> {/* For the columns here, I want a 80%/20% split, and that does not conform to the 12-column grid that Bootstrap provides, so I'll just adjust it by manually setting the width of each. Using col-auto as the class preserves the grid structure without forcing a specific width */}
          <button type="button" id="clear" class="col-auto border text-end" style={{ width: '80%' }} onClick={() => this.clearScreenBtn()}>AC</button>
          <button type="button" id="decimal" class="col-auto border text-center" style={{ width: '20%' }} onClick={() => this.handleDecimal()}>.</button>
        </div>
      </div>
    );
  }
}

/* Time to setup reducers and store. I think I'll have four items on my state: the display value, input one, operator, and input two. Pressing "Clear" resets all to zero, but otherwise, once an input one and an operator have been added, then a second input, pressing any other operator will compute the first part of the calcs, pass the result to display and to input one, the second operator to operator, and will wait for data on input two, rinse and repeat
I'm thinking of storing display, input one and input two as numbers, and then turn them into strings when it needs to be displayed. Might revisit this idea later 
UPDATE 1 - Ok, I added a new variable called currentValue. I was initially thinking of working with it within the scope of the React component, but since I'm using Redux, might as well manage this here
UPDATE 2 - I've added a Do Not Refresh tag, so when currentValue is emptied and its value is moved into inputOne or inputTwo, the screen keeps the old value until a new value is started 
UPDATE FINAL - I have no idea how many variables I added and removed throughout the coding process, but I ended up with a single stored variable (valueOne) plus one live variable (currentValue) carrying the calculator's values. flagDNR and negFlag were helpful to manage edge cases. Everythign else was mostly like I originally envisioned. Turns out valueTwo was irrelevant since I was always moving calculation's results into memory (valueOne) and handling the current display with currentValue */

const initialState = {
  display: 0,
  operator: "",
  currentValue: [0],
  flagDNR: false,
  lastPress: null,
  valueOne: null,
  negFlag: false,
}

// The reducer also evolved a lot. The same way I realized I needed new variables in the state, I had to incorporate the corresponding action types. Definitely not difficult, just requires some attention to manage properly. It was also good to unpack how I can flesh out the actions more here in the reducer vs. in the component methods themselves
const calculatorReducer = (state = initialState, action) => {
  switch(action.type) {
    case "UPDATE_DISPLAY":
      return {
        ...state,
        display: action.payload.message,
      };
    case "ADD_DIGIT":
      if (state.currentValue.length === 1 && state.currentValue[0] === 0 && action.payload.digit !== ".") {
        return {
          ...state,
          currentValue: [action.payload.digit]
        };
      } else {
        return {
          ...state,
          currentValue: [...state.currentValue, action.payload.digit]
        };
      }
    case "CLEAR_MEMORY":
      return {
        ...state,
        currentValue: [0],
      };
    case "UPDATE_OPERATOR":
      return {
        ...state,
        operator: action.payload.operator,
      }
    case "SET_DNR":
      return {
        ...state,
        flagDNR: true,
      }
    case "RESET_DNR":
      return {
        ...state,
        flagDNR: false,
      }
    case "SET_NEG":
      return {
        ...state,
        negFlag: true,
      }
    case "RESET_NEG":
      return {
        ...state,
        negFlag: false,
      }  
    case "LAST_PRESS":
      return {
        ...state,
        lastPress: action.payload.message,
      }
    case "UPDATE_V_ONE":
      return {
        ...state,
        valueOne: action.payload.input,
        currentValue: [0],
      }
    case "COMPUTE":
      let result;
      const current = parseFloat(state.currentValue.join(''));
      switch(state.operator) {
        case "ADD":
          result = state.valueOne + current;
          break;
        case "SUBTRACT":
          result = state.valueOne - current;
          break;
        case "MULTIPLY":
          result = state.valueOne * current;
          break;
        case "DIVIDE":
          result = state.valueOne / current;
          break;
        default:
          return state;
      }
      return {
        ...state,
        currentValue: [0],
        flagDNR: true,
        valueOne: result,
        display: result,
      }
    default:
      return state;
  }
};

const store = createStore(calculatorReducer);

/* Set up React Redux connection later
UPDATE 1 - Ok, now it's later. Mapping state to props is simple, but still thinking about the dispatch. I'm thinking whether it's not better to keep all the calculation logic within the React component, and dispatch only the display updates through Redux. Might try this first and see how it goes. In this case, I might go back to my initialState and strip it of most properties, except the display variable */

const mapStateToProps = (state) => {
  return {
    display: state.display,
    operator: state.operator,
    currentValue: state.currentValue,
    flagDNR: state.flagDNR,
    lastPress: state.lastPress,
    valueOne: state.valueOne,
    negFlag: state.negFlag,
  }
}

const dispatchStateToProps = (dispatch) => ({
  updateDisplay: (msg) => dispatch({ type: "UPDATE_DISPLAY", payload: {message: msg}}),
  addDigit: (dgt) => dispatch({ type: "ADD_DIGIT", payload: {digit: dgt}}),
  clearMemory: () => dispatch({ type: "CLEAR_MEMORY" }),
  updateOperator: (opr) => dispatch({ type: "UPDATE_OPERATOR", payload: {operator: opr}}),
  setDNR: () => dispatch({ type: "SET_DNR"}),
  resetDNR: () => dispatch({ type: "RESET_DNR"}),
  setNegFlag: () => dispatch({ type: "SET_NEG" }),
  resetNegFlag: () => dispatch({ type: "RESET_NEG" }),
  computeOperation: () => dispatch({ type: "COMPUTE" }),
  updateLastPress: (msg) => dispatch({ type: "LAST_PRESS", payload: {message: msg}}),
  setValueOne: (value) => dispatch({ type: "UPDATE_V_ONE", payload: {input: value}}),
});

const ConnectedCalculator = connect(mapStateToProps, dispatchStateToProps)(Calculator);

/* Rendering. First passing our React component straight into the ReactDOM.render method, later wrapping it on a Provider once React-Redux has been connected 
UPDATE 1 - ConnectedCalculator has been created, pass the Wrapper component with the Provider */

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Provider store={store}>
        <ConnectedCalculator />
          </Provider>
    );
  }
};

ReactDOM.render(<AppWrapper />,document.getElementById("root"));







HTML

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

<div id="root" class="vh-100 d-flex align-items-center justify-content-center border border-primary"></div>









CSS

#clear {
  background-color: maroon;
  color: white;
}