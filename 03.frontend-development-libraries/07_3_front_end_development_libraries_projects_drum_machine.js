// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-drum-machine
// Codepen link: https://codepen.io/pen?template=MJjpwO

// Setting up dependencies

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux"
import { Provider, connect } from "https://esm.sh/react-redux";

// Probably will try to setup a master component with five child parts within it - the 9x9 grid, the power button, the display area, the slider, and the bank switch. Fingers crossed, wish me luck, let's see how it goes. Will rely heavily on bootstrap in particular to format the 9x9 grid

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
      <div id="drum-machine" className="container-fluid border border-primary border-5">
        <div id="pad-container">
          <div id="uid1" className="drum-pad">Q</div>
          <div id="uid2" className="drum-pad">W</div>
          <div id="uid3" className="drum-pad">E</div>
          <div id="uid4" className="drum-pad">A</div>
          <div id="uid5" className="drum-pad">S</div>
          <div id="uid6" className="drum-pad">D</div>
          <div id="uid7" className="drum-pad">Z</div>
          <div id="uid8" className="drum-pad">X</div>
          <div id="uid9" className="drum-pad">C</div>
        </div>
        <div id="settings-container">
          <div id="power-switch"></div>
          <div id="display"></div>
          <div id="slider"></div>
          <div id="bank-switch"></div>
        </div>
      </div>
    );
  }
}

// Rendering on screen. Later, update this from the Machine component to the AppWrapper component (once the React-Redux connection has been finalized)

ReactDOM.render(<Machine />,document.getElementById("root")
);