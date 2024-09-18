// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator
// Codepen link: https://codepen.io/fernandopa/pen/vYqqrZb

// Project notes: right now the initial layout is setup. Before I proceed with the React-Redux connection, I need to make sure all these divs become buttons (except for the Display of course), and that I can format them appropriately with Bootstrap. The grid is looking better than the previous exercise, but it still needs work

// Setting up external dependencies

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux"
import { Provider, connect } from "https://esm.sh/react-redux";

// Layout: one parent container, five rows. First row is display (across all columns), second row is numbers 1 through 5, third row is numbers 6 through 0, fourth row is operations and equals, last row is clear with 4 columns width and decimal point with one column width

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return(
      <div class="container border border-secondary">
        <div id="row-1" class="row">
          <div id="display" class="col-5 border border-primary">Display</div>
        </div>
        <div id="row-2" class="row">
          <div id="one" class="col-1 border border-primary">1</div>
          <div id="two" class="col-1 border border-primary">2</div>
          <div id="three" class="col-1 border border-primary">3</div>
          <div id="four" class="col-1 border border-primary">4</div>
          <div id="five" class="col-1 border border-primary">5</div>
        </div>
        <div id="row-3" class="row">
          <div id="six" class="col-1 border border-primary">6</div>
          <div id="seven" class="col-1 border border-primary">7</div>
          <div id="eight" class="col-1 border border-primary">8</div>
          <div id="nine" class="col-1 border border-primary">9</div>
          <div id="zero" class="col-1 border border-primary">0</div>
        </div>
        <div id="row-4" class="row">
          <div id="add" class="col-1 border border-primary">+</div>
          <div id="subtract" class="col-1 border border-primary">-</div>
          <div id="multiply" class="col-1 border border-primary">*</div>
          <div id="divide" class="col-1 border border-primary">/</div>
          <div id="equals" class="col-1 border border-primary">=</div>
        </div>
        <div id="row-5" class="row">
          <div id="clear" class="col-4 border border-primary">AC</div>
          <div id="decimal" class="col-1 border border-primary">.</div>
        </div>
      </div>
    );
  }
}

/* Time to setup reducers and store. I think I'll have four items on my state: the display value, input one, operator, and input two. Pressing "Clear" resets all to zero, but otherwise, once an input one and an operator have been added, then a second input, pressing any other operator will compute the first part of the calcs, pass the result to display and to input one, the second operator to operator, and will wait for data on input two, rinse and repeat

I'm thinking of storing display, input one and input two as numbers, and then turn them into strings when it needs to be displayed. Might revisit this idea later */

const initialState = {
  display: 0,
  inputOne: 0,
  operator: "",
  inputTwo: 0,
}

const calculatorReducer = (state = initialState, action) => {
  switch(action.type) {
    case "CLEAR_DISPLAY":
      return {
        ...state,
        initialState
      };
    default:
      return state;
  }
};

const store = createStore(calculatorReducer);

// Set up React Redux connection later

// Rendering. First passing our React component straight into the ReactDOM.render method, later wrapping it on a Provider once React-Redux has been connected

ReactDOM.render(<Calculator />,document.getElementById("root"));