// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-25--5-clock
// Codepen link: https://codepen.io/fernandopa/pen/gOVOgVP

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

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
  }
  
  playAudio = () => {
    const audio = document.getElementById("beep");
    audio.play();
  }
  
  rewindAudio = () => {
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  handleStartStop = () => {
    this.props.toggleIsRunning();
  }

  handleReset = () => {
    this.props.resetTimer();
    this.props.stopTimer();
    this.rewindAudio();
  }

  handleSessionDecrement = () => {
    const { sessionLength, isRunning, sessionDec } = this.props;
    if (sessionLength > 1 && !isRunning) {
      sessionDec();
    }
  }

  handleSessionIncrement = () => {
    const { sessionLength, isRunning, sessionInc } = this.props;
    if (sessionLength < 60 && !isRunning) {
      sessionInc();
    }
  }

  handleBreakDecrement = () => {
    const { breakLength, isRunning, breakDec } = this.props;
    if (breakLength > 1 && !isRunning) {
      breakDec();
    }
  }

  handleBreakIncrement = () => {
    const { breakLength, isRunning, breakInc } = this.props;
    if (breakLength < 60 && !isRunning) {
      breakInc();
    }
  }
  
  startTimer = () => {
    this.timerInterval = setInterval(() => {
      this.props.decrementTime();
    }, 1000);
  }

  stopTimer = () => {
    clearInterval(this.timerInterval);
  }
  
  componentDidUpdate(prevProps) {
    const { isRunning, timeLeft, sessionLabel, setSessionLabel, setBreakLabel, setTimer, breakLength, sessionLength } = this.props;
    if (isRunning !== prevProps.isRunning) {
      if (isRunning) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    }
    // Manage what happens when timer hits zero
    if (timeLeft < 0) {
      if (sessionLabel === "Session") {
        setBreakLabel();
        setTimer(breakLength);
        this.playAudio();
      } else if (sessionLabel === "Break") {
        setSessionLabel();
        setTimer(sessionLength);
        this.playAudio();
      }
    }
  }

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
              <button id="start_stop" className="col-6" onClick={this.handleStartStop}>⏯️</button>
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
        <audio id="beep" className="clip" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
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
    case "DEC_TIMER":
      return {
        ...state,
        timeLeft: state.timeLeft >= 0 ? state.timeLeft - 1 : 0,
      }
    case "SESSION_LABEL":
      return {
        ...state,
        sessionLabel: "Session",
      }
    case "BREAK_LABEL":
      return {
        ...state,
        sessionLabel: "Break",
      }
    case "SET":
      return {
        ...state,
        timeLeft: action.payload.number * 60,
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
  decrementTime: () => dispatch({ type: "DEC_TIMER" }),
  setSessionLabel: () => dispatch({ type: "SESSION_LABEL" }),
  setBreakLabel: () => dispatch({ type: "BREAK_LABEL" }),
  setTimer: (num) => dispatch({ type: "SET", payload: {number: num} }),
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










HTML

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

<div id="root" class="vh-100 d-flex align-items-center justify-content-center border border-primary"></div>


