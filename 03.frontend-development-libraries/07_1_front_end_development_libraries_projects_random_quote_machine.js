// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-random-quote-machine
// Example solution: https://random-quote-machine.freecodecamp.rocks/
// You can build the solution using CodePen: https://codepen.io/pen?template=MJjpwO

//If you want to make sure your project is not failing because of React 18 start by using the old render method

import ReactDOM from "react-dom";
import App from "./App";
ReactDOM.render(<App />,  document.getElementById("root"));

// If that doesn't help downgrade to React 17


/* When working on a React/Redux project, here are some essential steps to follow:

    Set up the project structure: Use tools like create-react-app to scaffold the basic React project, or configure a custom build if needed.

    Redux setup:
        Create reducers: Define a reducer that handles the initial state and actions.
        Create the store: Set up the Redux store using createStore (or configureStore from Redux Toolkit if you're using modern Redux).

    Connect React and Redux: Use Provider from react-redux to pass the Redux store to your React app components.

    Create components:
        Render basic React components to make sure everything is wired up correctly.
        Use connect or useSelector/useDispatch hooks to interact with the Redux store.

    React Router (optional but often needed): If your app has multiple pages, you'll need routing. Setting up react-router is helpful at this stage.

    Middleware: If you need to handle asynchronous logic (like fetching data), integrate redux-thunk or redux-saga for async actions.

    Styling setup: Optionally set up Bootstrap or SASS for styling, depending on your needs. */
	


const mapStateToProps = (state) => {
  return {
    quote: state.quote,
    author: state.author,
    quotesLoaded: state.quotesLoaded // Include quote loading state
  }
};

const mapDispatchToProps = (dispatch) => ({
  generateQuote: () => {
    if (quoteList.length > 0) {
      const randomIndex = Math.floor(Math.random() * quoteList.length);
      const newQuote = {
        quote: quoteList[randomIndex].q,
        author: quoteList[randomIndex].a
      };
      dispatch({ type: NEW, newQuote });
    } else {
      console.log("Quotes are still loading...");
    }
  },
  setQuotesLoaded: () => dispatch({ type: "SET_QUOTES" }) // Action to set loaded flag
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

// Setting up React components for handling logic and displaying elements on the screen

class Presentational extends React.Component {
  componentDidMount() {
    // Fetch quotes when component mounts
    this.fetchQuotes();
  }

  async fetchQuotes() {
    const api_url = "https://zenquotes.io/api/quotes/";
    const response = await fetch(api_url);
    const data = await response.json();
    quoteList = data;
    console.log("Quote List:", quoteList);
    this.props.setQuotesLoaded(); // Inform the Redux store that quotes are loaded
  }

  render() {
    const { quote, author, generateQuote, quotesLoaded } = this.props;
    return (
      <div id="quote-box">
        <h2>Random Quote Generator</h2>
        <h3 id="text">{quote}</h3>
        <h4 id="author">{author}</h4>
        <button onClick={generateQuote} disabled={!quotesLoaded}>
          {quotesLoaded ? "Generate a new Quote" : "Loading Quotes..."}
        </button>
      </div>
    );
  }
}

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}
