// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-markdown-previewer
// Codepen: https://codepen.io/fernandopa/pen/OJeqNBO

// Setting up dependencies

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux"
import { Provider, connect } from "https://esm.sh/react-redux";
import { marked } from "https://cdnjs.cloudflare.com/ajax/libs/marked/14.1.2/lib/marked.esm.js"

marked.setOptions({
  breaks: true, // ensures line breaks are respected
  gfm: true // enables GitHub Flavored Markdown
});

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
      <div className="container-fluid border border-dark rounded px-5">
        <h1 className="text-center">Editor</h1>
        <textarea className="form-control" rows="4" id="editor" value={input} onChange={this.handleChange}></textarea>
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
      <div className="container-fluid border border-dark rounded mx-auto">
        <h1 className="text-center">Preview Area</h1>
        <div className="border border-dark" id="preview" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  }
}

// Setting up Redux reducers and store --> at this point, make sure we have a good view of what the data structure will look like. We need to be able to tell what's the structure of the state, and which actions we want to be handled in the future by the reducer. In the present case, let's make state holding only the message that is entered into textarea, and the reducer being responsible for sending it to state

const initialState = {
  input: "# Heading 1\n## Sub Header 2\n\nSome **bold** text, `<div>inline code</div>` and a [link](https://example.com).\n\n >Block quote\n\nLists:\n\n - And of course there are lists.\n \t- Some are bulleted.\n \t\t- Some have deeper indentation\n\nCode block:\n\n ```\n// this is multi-line code:\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nEmbedded image:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)"
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

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
<div id="root"></div>







CSS