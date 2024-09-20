// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator
// Codepen link: https://codepen.io/fernandopa/pen/vYqqrZb

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Project notes - one test missing. Handling the negative sign has proven very very very difficult indeed

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
    this.equalButton = this.equalButton.bind(this);
  }
  
  clearScreenBtn() {
    //console.log("Clear Screen Btn pressed");
    this.props.clearMemory();
    this.props.updateDisplay(0);
    this.props.updateOperator("");
    this.props.updateInputOne(null);
    this.props.updateInputTwo(null);
    this.props.updateLastPress("Clear");
  }
  
  handleNumber(num) {
    //console.log("Number pressed");
    if(this.props.flagInvert === true) {
      if (this.props.currentValue.length === 1 && this.props.currentValue[0] === 0) {
        this.props.clearMemory();  // Clear the initial 0
      }
      num = num * (-1);
      this.props.resetInvert();
    }
    this.props.addDigit(num);
    this.props.updateLastPress("Number");
  }
  
  handleDecimal() {
    if(this.props.lastPress === "Decimal") {
      return;
    } else if(this.props.currentValue.includes(".")) {
      return;
    } else {
      this.props.addDigit(".");
      this.props.updateLastPress("Decimal");
    }
  }
  
  handleOperator(opr) {
    //console.log("Operator Pressed");
    if (this.props.lastPress === "Operator" && opr === "SUBTRACT") {
    // Set the invert flag to mark that the next number should be negative
      this.props.setInvert();
      return;
    }
    
    if (this.props.inputOne !== null && this.props.operator !== "") {
      // Perform the previous operation
      let inputTwo = parseFloat(this.props.currentValue.join(''));
      this.props.updateInputTwo(inputTwo);
      this.props.computeOperation();
    } else if (this.props.inputOne === null) {
      let inputOne = parseFloat(this.props.currentValue.join(''));
      this.props.updateInputOne(inputOne);
    }
    this.props.updateOperator(opr);
    this.props.clearMemory();
    this.props.setDNR();
    this.props.updateLastPress("Operator");
  }
  
  equalButton() {
    //console.log("Equal pressed");
    if (this.props.lastPress === "Operator") {
      //console.log("Nothing happened!");
      return;
    }
    if (this.props.inputOne !== null && this.props.operator !== "") {
      this.props.updateInputTwo(parseFloat(this.props.currentValue.join('')));
      this.props.computeOperation();
      this.props.updateOperator("");
    }
    this.props.updateLastPress("Equal");
  }
  
  componentDidUpdate(prevProps) {
    console.log("---");
    //console.log("display", this.props.display);
    console.log("currentValue", this.props.currentValue);
    console.log("operator", this.props.operator);
    console.log("inputOne", this.props.inputOne);
    console.log("inputTwo", this.props.inputTwo);
    //console.log("Flag DNR", this.props.flagDNR);
    //console.log("LastPress", this.props.lastPress);
    console.log("flagInvert", this.props.flagInvert);
    
    if (prevProps.currentValue !== this.props.currentValue && !this.props.flagDNR ) {
      let num;
      if (this.props.currentValue.length === 1 && this.props.currentValue[0] === 0) {
        num = 0;
      } else if (this.props.currentValue.includes(".")) {
        num = this.props.currentValue.join('');
      } else {
        num = parseFloat(this.props.currentValue.join(''));
      }
      this.props.updateDisplay(num);
    }
    this.props.resetDNR();
   }
  
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
          <button type="button" id="equals" class="col border" onClick={() => this.equalButton()}>=</button>
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

UPDATE 2 - I've added a Do Not Refresh tag, so when currentValue is emptied and its value is moved into inputOne or inputTwo, the screen keeps the old value until a new value is started */

const initialState = {
  display: 0,
  inputOne: null,
  operator: "",
  inputTwo: null,
  currentValue: [0],
  flagDNR: false,
  lastPress: null,
  flagInvert: false,
}

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
    case "UPDATE_INPUT_ONE":
      return {
        ...state,
        inputOne: action.payload.number,
      }
    case "UPDATE_INPUT_TWO":
      return {
        ...state,
        inputTwo: action.payload.number,
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
    case "LAST_PRESS":
      return {
        ...state,
        lastPress: action.payload.message,
      }
    case "SET_INVERT":
      return {
        ...state,
        flagInvert: true,
      }
    case "RESET_INVERT":
      return {
        ...state,
        flagInvert: false,
      }  
    case "COMPUTE":
      let result;
      switch(state.operator) {
        case "ADD":
          result = state.inputOne + state.inputTwo;
          break;
        case "SUBTRACT":
          result = state.inputOne - state.inputTwo;
          break;
        case "MULTIPLY":
          result = state.inputOne * state.inputTwo;
          break;
        case "DIVIDE":
          result = state.inputOne / state.inputTwo;
          break;
        default:
          return state;
      }
      return {
        ...state,
        currentValue: [result],
        inputOne: result,
        inputTwo: null,
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
    inputOne: state.inputOne,
    operator: state.operator,
    inputTwo: state.inputTwo,
    currentValue: state.currentValue,
    flagDNR: state.flagDNR,
    lastPress: state.lastPress,
    flagInvert: state.flagInvert,
  }
}

const dispatchStateToProps = (dispatch) => ({
  updateDisplay: (msg) => dispatch({ type: "UPDATE_DISPLAY", payload: {message: msg}}),
  addDigit: (dgt) => dispatch({ type: "ADD_DIGIT", payload: {digit: dgt}}),
  clearMemory: () => dispatch({ type: "CLEAR_MEMORY" }),
  updateOperator: (opr) => dispatch({ type: "UPDATE_OPERATOR", payload: {operator: opr}}),
  updateInputOne: (num) => dispatch({ type: "UPDATE_INPUT_ONE", payload: {number: num}}),
  updateInputTwo: (num) => dispatch({ type: "UPDATE_INPUT_TWO", payload: {number: num}}),
  setDNR: () => dispatch({ type: "SET_DNR"}),
  resetDNR: () => dispatch({ type: "RESET_DNR"}),
  computeOperation: () => dispatch({ type: "COMPUTE" }),
  updateLastPress: (msg) => dispatch({ type: "LAST_PRESS", payload: {message: msg}}),
  setInvert: () => dispatch({ type: "SET_INVERT" }),
  resetInvert: () => dispatch({ type: "RESET_INVERT" }),
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