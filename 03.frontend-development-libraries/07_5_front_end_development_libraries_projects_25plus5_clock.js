// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-25--5-clock
// Codepen link: https://codepen.io/fernandopa/pen/gOVOgVP

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// TO-DO: implement the actual countdown every 1000 ms, implement the change from session to break countdown and the audio beep

// Setting up external dependencies

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux"
import { Provider, connect } from "https://esm.sh/react-redux";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
  }
  
  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  handleStartStop = () => {
    this.props.toggleIsRunning();
  };

  handleReset = () => {
    this.props.resetTimer();
    this.props.stopTimer();
  };

  handleSessionDecrement = () => {
    const { sessionLength, isRunning, sessionDec } = this.props;
    if (sessionLength > 0 && !isRunning) {
      sessionDec();
    }
  };

  handleSessionIncrement = () => {
    const { sessionLength, isRunning, sessionInc } = this.props;
    if (sessionLength < 60 && !isRunning) {
      sessionInc();
    }
  };

  handleBreakDecrement = () => {
    const { breakLength, isRunning, breakDec } = this.props;
    if (breakLength > 0 && !isRunning) {
      breakDec();
    }
  };

  handleBreakIncrement = () => {
    const { breakLength, isRunning, breakInc } = this.props;
    if (breakLength < 60 && !isRunning) {
      breakInc();
    }
  };

  render() {
    const { sessionLength, breakLength, sessionLabel, timeLeft } = this.props;
    
    return (
      <div className="container-fluid border">
        <div id="row-1" className="row text-center">
          <div className="col-12">
            <h1>Pomodoro Timer</h1>
          </div>
        </div>
        <div id="row-2" className="row text-center">
          <div className="col-8">
            <div className="row">
              <div id="timer-label" className="col-9 text-end">{sessionLabel}:</div>
              <div id="time-left" className="col-3">{this.formatTime(timeLeft)}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <button id="start-stop" className="col-6" onClick={this.handleStartStop}>⏯️</button>
              <button id="reset" className="col-6" onClick={this.handleReset}>🔄</button>
            </div>
          </div>
        </div>
        <div id="row-3" className="row text-center">
          <div id="session-label" className="col-6 text-end">Session Length:</div>
          <button id="session-decrement" className="col-2" onClick={this.handleSessionDecrement}>↙️</button>
          <div id="session-length" className="col-2">{sessionLength}</div>
          <button id="session-increment" className="col-2" onClick={this.handleSessionIncrement}>↗️</button>
        </div>
        <div id="row-4" className="row text-center">
          <div id="break-label" className="col-6 text-end">Break Length:</div>
          <button id="break-decrement" className="col-2" onClick={this.handleBreakDecrement}>↙️</button>
          <div id="break-length" className="col-2">{breakLength}</div>
          <button id="break-increment" className="col-2" onClick={this.handleBreakIncrement}>↗️</button>
        </div>
      </div>
    );
  }
}

const initialState = {
  sessionLength: 25,
  breakLength: 5,
  sessionLabel: "Session",
  timeLeft: 1500,
  isRunning: false,
}

const timerReducer = (state = initialState, action) => {
  switch(action.type) {
    case "RESET":
      return {
        ...state,
        sessionLength: 25,
        breakLength: 5,
        sessionLabel: "Session",
        timeLeft: 1500,
      }
    case "SESSIONDEC":
      return {
        ...state,
        sessionLength: state.sessionLength - 1,
        timeLeft: state.timeLeft - 60,
      }
    case "SESSIONINC":
      return {
        ...state,
        sessionLength: state.sessionLength + 1,
        timeLeft: state.timeLeft + 60,
      }
    case "BREAKDEC":
      return {
        ...state,
        breakLength: state.breakLength - 1,
      }
    case "BREAKINC":
      return {
        ...state,
        breakLength: state.breakLength + 1,
      }
    case "TOGGLE":
      return {
        ...state,
        isRunning: !state.isRunning,
      }
    case "STOP":
      return {
        ...state,
        isRunning: false,
      }
    default:
      return state;
  }
};

const store = createStore(timerReducer);

const mapStateToProps = (state) => {
  return {
    sessionLength: state.sessionLength,
    breakLength: state.breakLength,
    sessionLabel: state.sessionLabel,
    timeLeft: state.timeLeft,
    isRunning: state.isRunning,
  }
}

const dispatchStateToProps = (dispatch) => ({
  resetTimer: () => dispatch({ type: "RESET" }),
  sessionDec: () => dispatch({ type: "SESSIONDEC" }),
  sessionInc: () => dispatch({ type: "SESSIONINC" }),
  breakDec: () => dispatch({ type: "BREAKDEC" }),
  breakInc: () => dispatch({ type: "BREAKINC" }),
  toggleIsRunning: () => dispatch({ type: "TOGGLE" }),
  stopTimer: () => dispatch({ type: "STOP" }),
});

const ConnectedTimer = connect(mapStateToProps, dispatchStateToProps)(Timer);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Provider store={store}>
        <ConnectedTimer />
          </Provider>
    );
  }
};

ReactDOM.render(<AppWrapper />,document.getElementById("root"));

