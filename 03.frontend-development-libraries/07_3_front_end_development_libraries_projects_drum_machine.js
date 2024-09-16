// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-drum-machine
// Codepen link: https://codepen.io/fernandopa/pen/LYKaJQJ

// To-do: right now, I pass the user stories, but both Power and Bank switches are useless (just placeholders), and there's no volume slider or logic behind it

// Setting up external dependencies

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux"
import { Provider, connect } from "https://esm.sh/react-redux";

// I'll start by setting up a master component with two children - the 9x9 grid on the left, and the settings on the right containing the power button, the display area, the volume slider, and the bank switch. Fingers crossed, wish me luck, let's see how it goes. Will rely heavily on bootstrap in particular to format the 9x9 grid

class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.playAudio = this.playAudio.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  audioMessages = {
    'Q': 'Heater 1',
    'W': 'Heater 2',
    'E': 'Heater 3',
    'A': 'Heater 4',
    'S': 'Clap',
    'D': 'Open HH',
    'Z': 'Kick N Hat',
    'X': 'Kick',
    'C': 'Closed HH',
  };
  
  playAudio(id) {
    const audio = document.getElementById(id);
    audio.play();
//  console.log("Within playAudio: id -- ", id," -- audioMessagesID --",this.audioMessages[id]);
    this.props.updateDisplay(this.audioMessages[id] || 'Playing sound');
  }  
  componentDidMount() {
    document.addEventListener("keydown",this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown",this.handleKeyPress);
  }  
  handleKeyPress = (event) => {
    this.playAudio(event.key.toUpperCase());
  }
  
  render(){
    const {display} = this.props;
    return(
      <div id="drum-machine" className="container bg-secondary row h-75">
          <div id="pad-container" className="container border border-primary col-8 h-100 p-3">
            <div className="row">
              <button type="button" id="heater1" className="drum-pad col border border-secondary shadow" onClick={() => this.playAudio('Q')}>Q<audio id="Q" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" /></button>
              <button type="button" id="heater2" className="drum-pad col border border-secondary shadow" onClick={() => this.playAudio('W')}>W<audio id="W" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" /></button>
              <button type="button" id="heater3" className="drum-pad col border border-secondary shadow" onClick={() => this.playAudio('E')}>E<audio id="E" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3" /></button>
            </div>
            <div className="row">
              <button type="button" id="heater4" className="drum-pad col border border-secondary shadow" onClick={() => this.playAudio('A')}>A<audio id="A" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3" /></button>
              <button type="button" id="clap" className="drum-pad col border border-secondary shadow" onClick={() => this.playAudio('S')}>S<audio id="S" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" /></button>
              <button type="button" id="openhh" className="drum-pad col border border-secondary shadow" onClick={() => this.playAudio('D')}>D<audio id="D" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" /></button>
            </div>
            <div className="row">
              <button type="button" id="kicknhat" className="drum-pad col border border-secondary shadow" onClick={() => this.playAudio('Z')}>Z<audio id="Z" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3" /></button>
              <button type="button" id="kick" className="drum-pad col border border-secondary shadow" onClick={() => this.playAudio('X')}>X<audio id="X" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" /></button>
              <button type="button" id="closedhh" className="drum-pad col border border-secondary shadow" onClick={() => this.playAudio('C')}>C<audio id="C" className="clip" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" /></button>
            </div>
          </div>
          <div id="settings-container" className="container border border-primary text-center col-4 h-100 p-3">
            <div id="power-switch" className="border border-tertiary">Power: 
              <label className="switch">
                <input type="checkbox" />
                  <span className="toggle-slider"></span>
              </label>
            </div>
            <div id="display" className="border border-tertiary">{display}</div>
            <div id="volume-slider" className="border border-tertiary ">Volume Slider</div>
            <div id="bank-switch" className="border border-tertiary">Bank: 
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
  display: "Uninitialized",
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














HTML

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
<div id="root" class="vh-100 d-flex align-items-center justify-content-center"></div>









CSS

/* Switch code: */

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .toggle-slider {
  background-color: #2196F3;
}

input:focus + .toggle-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .toggle-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* End of Switch code: */