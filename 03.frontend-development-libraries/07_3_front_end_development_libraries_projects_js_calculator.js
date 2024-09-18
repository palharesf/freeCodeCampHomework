// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator
// Codepen link: https://codepen.io/fernandopa/pen/vYqqrZb

// Project Notes: lots of upgrades today. All buttons have been added, and most buttons are functional except for the operators. A lot of logic has been developed and implemented, with operations and computing still remaining.

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
    this.computeOperation = this.computeOperation.bind(this);
  }
  
  clearScreenBtn() {
    //console.log("Clear Screen Btn pressed");
    this.props.clearMemory();
    this.props.updateDisplay(0);
  }
  
  handleNumber(num) {
    console.log("Current Value pre update: ",this.props.currentValue);
    this.props.addDigit(num);
  }
  
  handleDecimal() {
    if(this.props.currentValue.includes(".")) {
      alert("Number already includes decimal point");
    } else {
      this.props.addDigit(".");
    }
  }
  
  handleOperator(opr) {
    
  }
  
  computeOperation() {
    
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.currentValue !== this.props.currentValue) {
      console.log("Updated currentValue: ", this.props.currentValue);
      this.props.updateDisplay(parseFloat(this.props.currentValue.join('')));
    }
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
          <button type="button" id="add" class="col border" onClick="">+</button>
          <button type="button" id="subtract" class="col border" onClick="">-</button>
          <button type="button" id="multiply" class="col border" onClick="">*</button>
          <button type="button" id="divide" class="col border" onClick="">/</button>
          <button type="button" id="equals" class="col border" onClick={() => this.computeOperation()}>=</button>
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

UPDATE 1 - Ok, I added a new variable called currentValue. I was initially thinking of working with it within the scope of the React component, but since I'm using Redux, might as well manage this here*/

const initialState = {
  display: 80085,
  inputOne: 0,
  operator: "",
  inputTwo: 0,
  currentValue: [0],
}

const calculatorReducer = (state = initialState, action) => {
  switch(action.type) {
    case "UPDATE_DISPLAY":
      return {
        ...state,
        display: action.payload.message,
      };
    case "ADD_DIGIT":
      return {
        ...state,
        currentValue: [...state.currentValue, action.payload.digit]
      };
    case "CLEAR_MEMORY":
      return {
        ...state,
        currentValue: [0],
      };
    case "COMPUTE":
      switch(state.operator) {
          case "ADD":
            return {
              ...state,
              display: state.inputOne + state.inputTwo,
            };
          case "MULTIPLY":
            return {
              ...state,
              display: state.inputOne * state.inputTwo,
            };
          case "DIVIDE":
            return {
              ...state,
              display: state.inputOne / state.inputTwo,
            };
        default:
          return state;
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
  }
}

const dispatchStateToProps = (dispatch) => ({
  updateDisplay: (msg) => dispatch({ type: "UPDATE_DISPLAY", payload: {message: msg}}),
  addDigit: (dgt) => dispatch({ type: "ADD_DIGIT", payload: {digit: dgt}}),
  clearMemory: () => dispatch({ type: "CLEAR_MEMORY" }),
  computeOperation: () => dispatch({ type: "COMPUTE" }),
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