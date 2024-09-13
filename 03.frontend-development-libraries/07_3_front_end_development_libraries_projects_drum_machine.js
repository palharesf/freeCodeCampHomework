// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-drum-machine
// Codepen link: https://codepen.io/pen?template=MJjpwO

// Setting up dependencies

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux"
import { Provider, connect } from "https://esm.sh/react-redux";

// I'll start by setting up a master component with two children - the 9x9 grid on the left, and the settings on the right containing the power button, the display area, the volume slider, and the bank switch. Fingers crossed, wish me luck, let's see how it goes. Will rely heavily on bootstrap in particular to format the 9x9 grid

// User Story #4: Within each .drum-pad, there should be an HTML5 audio element which has a src attribute pointing to an audio clip, a class name of clip, and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.).
// User Story #5: When I click on a .drum-pad element, the audio clip contained in its child audio element should be triggered.
// User Story #6: When I press the trigger key associated with each .drum-pad, the audio clip contained in its child audio element should be triggered (e.g. pressing the Q key should trigger the drum pad which contains the string Q, pressing the W key should trigger the drum pad which contains the string W, etc.).
// User Story #7: When a .drum-pad is triggered, a string describing the associated audio clip is displayed as the inner text of the #display element (each string must be unique).

class Machine extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div id="drum-machine" className="container-lg border border-primary row text-center justify-content-center align-items-center p-2">
          <div id="pad-container" className="container-md border border-secondary col-8">
            <div className="row">
              <div id="uid1" className="drum-pad col border border-tertiary shadow">Q</div>
              <div id="uid2" className="drum-pad col border border-tertiary shadow">W</div>
              <div id="uid3" className="drum-pad col border border-tertiary shadow">E</div>
            </div>
            <div className="row">
              <div id="uid4" className="drum-pad col border border-tertiary shadow">A</div>
              <div id="uid5" className="drum-pad col border border-tertiary shadow">S</div>
              <div id="uid6" className="drum-pad col border border-tertiary shadow">D</div>
            </div>
            <div className="row">
              <div id="uid7" className="drum-pad col border border-tertiary shadow">Z</div>
              <div id="uid8" className="drum-pad col border border-tertiary shadow">X</div>
              <div id="uid9" className="drum-pad col border border-tertiary shadow">C</div>
            </div>
          </div>
          <div id="settings-container" className="container-sm border border-secondary col-4">
            <div id="power-switch" className="border border-tertiary">Power
              <label className="switch">
                <input type="checkbox" />
                  <span className="toggle-slider"></span>
              </label>
            </div>
            <div id="display" className="border border-tertiary">Display</div>
            <div id="volume-slider" className="border border-tertiary ">Volume Slider</div>
            <div id="bank-switch" className="border border-tertiary">Bank
              <label className="switch">
                <input type="checkbox" />
                  <span className="toggle-slider"></span>
              </label></div>
          </div>
      </div>
    );
  }
}

// Time to setup reducers and store. Initially, it seems the information we want to draw from the store are the results on the right, whereas HTML can handle the audio play on the left side. I can update in the future if I see this is not the case

const initialState = {
  powerOn: false,
  display: "",
  volume: 0.3,
  bankOn: false,
}

const machineReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POWER_SWITCH":
      return {
        ...state,
        powerOn: !state.powerOn,
      };
    case "UPDATE_DISPLAY":
      return {
        ...state,
        display: action.payload.message,
      }
    case "CHANGE_VOLUME":
      return {
        ...state,
        volume: action.payload.volume,
      };
    case "BANK_SWITCH":
      return {
        ...state,
        bankOn: !state.bankOn,
      };
    default:
      return state;
  }
};

const store = createStore(machineReducer);

// Setting up React-Redux connection.

const mapStateToProps = (state) => {
  return {
    powerOn: state.powerOn,
    display: state.display,
    volume: state.volume,
    bankOn: state.bankOn,
  }
}

const mapDispatchToProps = (dispatch) => ({
  togglePower: () => dispatch({ type: "POWER_SWITCH" }),
  updateDisplay: (msg) => dispatch({ type: "UPDATE_DISPLAY", payload: { message: msg }}),
  updateVolume: (vlm) => dispatch({ type: "CHANGE_VOLUME", payload: { volume: vlm } }),
  toggleBank: () => dispatch({ type: "BANK_SWITCH" }),
});

const ConnectedMachine = connect(mapStateToProps, mapDispatchToProps)(Machine);

// Rendering on screen. We use the AppWrapper component to link everything with the Provider

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <ConnectedMachine />
      </Provider>
    );
  }
};

ReactDOM.render(<AppWrapper />,document.getElementById("root")
);