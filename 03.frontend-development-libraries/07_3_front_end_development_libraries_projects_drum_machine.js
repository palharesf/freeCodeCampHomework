// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-drum-machine
// Codepen link: https://codepen.io/pen?template=MJjpwO

// Setting up dependencies

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux"
import { Provider, connect } from "https://esm.sh/react-redux";

// I'll start by setting up a master component with two children - the 9x9 grid on the left, and the settings on the right containing the power button, the display area, the volume slider, and the bank switch. Fingers crossed, wish me luck, let's see how it goes. Will rely heavily on bootstrap in particular to format the 9x9 grid

class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.playAudio = this.playAudio.bind(this);
  }
  
  playAudio(id) {
    const audio = document.getElementById(id);
    audio.play();
  }
  
  render(){
    return(
      <div id="drum-machine" className="container-lg border border-primary row text-center justify-content-center align-items-center p-2">
          <div id="pad-container" className="container-md border border-secondary col-8">
            <div className="row">
              <button type="button" id="heater1" className="drum-pad col border border-tertiary shadow" onClick={() => this.playAudio('Q')}>Q<audio id="Q" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" /></button>
              <button type="button" id="heater2" className="drum-pad col border border-tertiary shadow" onClick={() => this.playAudio('W')}>W<audio id="W" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" /></button>
              <button type="button" id="heater3" className="drum-pad col border border-tertiary shadow" onClick={() => this.playAudio('E')}>E<audio id="E" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3" /></button>
            </div>
            <div className="row">
              <button type="button" id="heater4" className="drum-pad col border border-tertiary shadow" onClick={() => this.playAudio('A')}>A<audio id="A" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3" /></button>
              <button type="button" id="clap" className="drum-pad col border border-tertiary shadow" onClick={() => this.playAudio('S')}>S<audio id="S" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" /></button>
              <button type="button" id="openhh" className="drum-pad col border border-tertiary shadow" onClick={() => this.playAudio('D')}>D<audio id="D" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" /></button>
            </div>
            <div className="row">
              <button type="button" id="kicknhat" className="drum-pad col border border-tertiary shadow" onClick={() => this.playAudio('Z')}>Z<audio id="Z" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3" /></button>
              <button type="button" id="kick" className="drum-pad col border border-tertiary shadow" onClick={() => this.playAudio('X')}>X<audio id="X" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" /></button>
              <button type="button" id="closedhh" className="drum-pad col border border-tertiary shadow" onClick={() => this.playAudio('C')}>C<audio id="C" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" /></button>
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



/* Reference code for the next user story:

numberInput.addEventListener("keydown", (e) => {							// The keydown event fires every time a user presses a key on their keyboard, and is a good way to add more interactivity to input elements
  if (e.key === "Enter") {													// Taking a closer look at one of those event objects, you'll see helpful properties like type and target. Since you want to perform an action when the Enter key is pressed, the most helpful property is key, which tells you the string value of the key that was pressed
    checkUserInput();
  }
}); */