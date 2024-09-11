// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-markdown-previewer
// Codepen: https://codepen.io/fernandopa/pen/OJeqNBO

// Setting up dependencies

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux"
import { Provider, connect } from "https://esm.sh/react-redux";
import { marked } from "https://cdnjs.cloudflare.com/ajax/libs/marked/14.1.2/lib/marked.esm.js"

// The marked library allows us to parse raw text into HTML. We can convert the markdown text to HTML using marked.parse(), then set the converted HTML content inside the innerHTML of the preview div, but in React we use dangerouslySetInnerHTML to insert raw HTML

// Setting up two Components: Editor and Previewer

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.setInput(event.target.value);
  }
  render(){
    const {handleChange, input} = this.props;
    return(
      <div>
        <h1>Editor</h1>
        <textarea id="editor" value={input} onChange={this.handleChange}></textarea>
      </div>
    );
  }
}

class Preview extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { input } = this.props;
    const htmlContent = marked.parse(input);
    
    //console.log("Props: ", this.props);
    //console.log("htmlContent: ", htmlContent);
    return(
      <div id="preview" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  }
}

// Setting up Redux reducers and store --> at this point, make sure we have a good view of what the data structure will look like. We need to be able to tell what's the structure of the state, and which actions we want to be handled in the future by the reducer. In the present case, let's make state holding only the message that is entered into textarea, and the reducer being responsible for sending it to state

const initialState = {
  input: "# Heading\n\nSome **bold** text and a [link](https://example.com)."
}

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MESSAGE":
      return {
        ...state,
        input: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(editorReducer);

// Define React-Redux connection

const mapStateToProps = (state) => {
  return {
    input: state.input,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setInput: (input) => dispatch({ type: "UPDATE_MESSAGE", payload: input }),
});

const ConnectedEditor = connect(mapStateToProps, mapDispatchToProps)(Editor);
const ConnectedPreview = connect(mapStateToProps, mapDispatchToProps)(Preview);

// Define Wrapper with all child components and render everything

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <ConnectedEditor />
        <ConnectedPreview />
      </Provider>
    );
  }
};

ReactDOM.render(<AppWrapper />,document.getElementById("root")
);





HTML

<div id="root"></div>







CSS