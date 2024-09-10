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

// Setting up dependencies

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux"
import { Provider, connect } from "https://esm.sh/react-redux";

// Setting up static quote-list; in the future maybe use an API call, but for now this will do

const quoteList = [
  {
    "q": "Failure will never overtake me if my determination to succeed is strong enough.",
    "a": "Og Mandino",
    "c": "79",
    "h": "<blockquote>&ldquo;Failure will never overtake me if my determination to succeed is strong enough.&rdquo; &mdash; <footer>Og Mandino</footer></blockquote>"
  },
  {
    "q": "The most tragic thing in the world is a man of genius who is not a man of honor.",
    "a": "George Bernard Shaw",
    "c": "80",
    "h": "<blockquote>&ldquo;The most tragic thing in the world is a man of genius who is not a man of honor.&rdquo; &mdash; <footer>George Bernard Shaw</footer></blockquote>"
  },
  {
    "q": "We would accomplish many more things if we did not think of them as impossible.",
    "a": "Vince Lombardi",
    "c": "79",
    "h": "<blockquote>&ldquo;We would accomplish many more things if we did not think of them as impossible.&rdquo; &mdash; <footer>Vince Lombardi</footer></blockquote>"
  },
  {
    "q": "Fishing is much more than fish.",
    "a": "Herbert Hoover",
    "c": "31",
    "h": "<blockquote>&ldquo;Fishing is much more than fish.&rdquo; &mdash; <footer>Herbert Hoover</footer></blockquote>"
  },
  {
    "q": "It doesn't matter if the glass is half empty or half full. Be grateful you have a glass - you're the only person that can decide what's in it.",
    "a": "Gurbaksh Chahal",
    "c": "142",
    "h": "<blockquote>&ldquo;It doesn't matter if the glass is half empty or half full. Be grateful you have a glass - you're the only person that can decide what's in it.&rdquo; &mdash; <footer>Gurbaksh Chahal</footer></blockquote>"
  },
  {
    "q": "If you want work well done, select a busy man; the other kind has no time.",
    "a": "Elbert Hubbard",
    "c": "74",
    "h": "<blockquote>&ldquo;If you want work well done, select a busy man; the other kind has no time.&rdquo; &mdash; <footer>Elbert Hubbard</footer></blockquote>"
  },
  {
    "q": "Till it has loved, no man or woman can become itself.",
    "a": "Emily Dickinson",
    "c": "53",
    "h": "<blockquote>&ldquo;Till it has loved, no man or woman can become itself.&rdquo; &mdash; <footer>Emily Dickinson</footer></blockquote>"
  },
  {
    "q": "Love yourself with the same intensity you would use to pull yourself up if you were hanging off a cliff.",
    "a": "Kamal Ravikant",
    "c": "104",
    "h": "<blockquote>&ldquo;Love yourself with the same intensity you would use to pull yourself up if you were hanging off a cliff.&rdquo; &mdash; <footer>Kamal Ravikant</footer></blockquote>"
  },
  {
    "q": "By the practice of meditation, you will find that you are carrying within your heart a portable paradise.",
    "a": "Paramahansa Yogananda",
    "c": "105",
    "h": "<blockquote>&ldquo;By the practice of meditation, you will find that you are carrying within your heart a portable paradise.&rdquo; &mdash; <footer>Paramahansa Yogananda</footer></blockquote>"
  },
  {
    "q": "Have a vision. Be demanding.",
    "a": "Colin Powell",
    "c": "28",
    "h": "<blockquote>&ldquo;Have a vision. Be demanding.&rdquo; &mdash; <footer>Colin Powell</footer></blockquote>"
  },
  {
    "q": "Be happy now, without reason - or you never will be at all.",
    "a": "Dan Millman",
    "c": "59",
    "h": "<blockquote>&ldquo;Be happy now, without reason - or you never will be at all.&rdquo; &mdash; <footer>Dan Millman</footer></blockquote>"
  },
  {
    "q": "Your gift is something that you can do innately better than anything else.",
    "a": "Steve Harvey",
    "c": "74",
    "h": "<blockquote>&ldquo;Your gift is something that you can do innately better than anything else.&rdquo; &mdash; <footer>Steve Harvey</footer></blockquote>"
  },
  {
    "q": "It is well known that those who do not trust themselves never trust others.",
    "a": "Alfred Adler",
    "c": "75",
    "h": "<blockquote>&ldquo;It is well known that those who do not trust themselves never trust others.&rdquo; &mdash; <footer>Alfred Adler</footer></blockquote>"
  },
  {
    "q": "Life is too short to waste your time on people who don't respect, appreciate, and value you.",
    "a": "Roy T. Bennett",
    "c": "92",
    "h": "<blockquote>&ldquo;Life is too short to waste your time on people who don't respect, appreciate, and value you.&rdquo; &mdash; <footer>Roy T. Bennett</footer></blockquote>"
  },
  {
    "q": "Freedom is the open window through which pours the sunlight of the human spirit and human dignity.",
    "a": "Herbert Hoover",
    "c": "98",
    "h": "<blockquote>&ldquo;Freedom is the open window through which pours the sunlight of the human spirit and human dignity.&rdquo; &mdash; <footer>Herbert Hoover</footer></blockquote>"
  },
  {
    "q": "A good stance and posture reflect a proper state of mind.",
    "a": "Morihei Ueshiba",
    "c": "57",
    "h": "<blockquote>&ldquo;A good stance and posture reflect a proper state of mind.&rdquo; &mdash; <footer>Morihei Ueshiba</footer></blockquote>"
  },
  {
    "q": "Leadership starts at the top.",
    "a": "Morgan Wootten",
    "c": "29",
    "h": "<blockquote>&ldquo;Leadership starts at the top.&rdquo; &mdash; <footer>Morgan Wootten</footer></blockquote>"
  },
  {
    "q": "Words are clothes that thoughts wear",
    "a": "Samuel Butler",
    "c": "36",
    "h": "<blockquote>&ldquo;Words are clothes that thoughts wear&rdquo; &mdash; <footer>Samuel Butler</footer></blockquote>"
  },
  {
    "q": "Those who dream by day are cognizant of many things which escape those who dream only by night.",
    "a": "Vincent van Gogh",
    "c": "95",
    "h": "<blockquote>&ldquo;Those who dream by day are cognizant of many things which escape those who dream only by night.&rdquo; &mdash; <footer>Vincent van Gogh</footer></blockquote>"
  },
  {
    "q": "Life is like underwear, should be changed twice a day.  ",
    "a": "Ray Bradbury",
    "c": "56",
    "h": "<blockquote>&ldquo;Life is like underwear, should be changed twice a day.  &rdquo; &mdash; <footer>Ray Bradbury</footer></blockquote>"
  },
  {
    "q": "Man's character is his fate.",
    "a": "Heraclitus",
    "c": "28",
    "h": "<blockquote>&ldquo;Man's character is his fate.&rdquo; &mdash; <footer>Heraclitus</footer></blockquote>"
  },
  {
    "q": "Whatever your heart clings to and confides in, that is really your God.",
    "a": "Martin Luther",
    "c": "71",
    "h": "<blockquote>&ldquo;Whatever your heart clings to and confides in, that is really your God.&rdquo; &mdash; <footer>Martin Luther</footer></blockquote>"
  },
  {
    "q": "Few things are more deceptive than memories.",
    "a": "Carlos Ruiz Zafon",
    "c": "44",
    "h": "<blockquote>&ldquo;Few things are more deceptive than memories.&rdquo; &mdash; <footer>Carlos Ruiz Zafon</footer></blockquote>"
  },
  {
    "q": "Perfectionism is simply putting a limit on your future.",
    "a": "John Eliot",
    "c": "55",
    "h": "<blockquote>&ldquo;Perfectionism is simply putting a limit on your future.&rdquo; &mdash; <footer>John Eliot</footer></blockquote>"
  },
  {
    "q": "Not how long, but how well you have lived is the main thing.",
    "a": "Seneca",
    "c": "60",
    "h": "<blockquote>&ldquo;Not how long, but how well you have lived is the main thing.&rdquo; &mdash; <footer>Seneca</footer></blockquote>"
  },
  {
    "q": "Action is the foundational key to all success.",
    "a": "Pablo Picasso",
    "c": "46",
    "h": "<blockquote>&ldquo;Action is the foundational key to all success.&rdquo; &mdash; <footer>Pablo Picasso</footer></blockquote>"
  },
  {
    "q": "It's easier to go down a hill than up it but the view is much better at the top.",
    "a": "Henry Ward Beecher",
    "c": "80",
    "h": "<blockquote>&ldquo;It's easier to go down a hill than up it but the view is much better at the top.&rdquo; &mdash; <footer>Henry Ward Beecher</footer></blockquote>"
  },
  {
    "q": "Failure is an option here. If things are not failing, you are not innovating enough.",
    "a": "Elon Musk",
    "c": "84",
    "h": "<blockquote>&ldquo;Failure is an option here. If things are not failing, you are not innovating enough.&rdquo; &mdash; <footer>Elon Musk</footer></blockquote>"
  },
  {
    "q": "Every person, all the events of your life are there because you have drawn them there. What you choose to do with them is up to you.",
    "a": "Richard Bach",
    "c": "132",
    "h": "<blockquote>&ldquo;Every person, all the events of your life are there because you have drawn them there. What you choose to do with them is up to you.&rdquo; &mdash; <footer>Richard Bach</footer></blockquote>"
  },
  {
    "q": "If you do not conquer self, you will be conquered by self.",
    "a": "Napoleon Hill",
    "c": "58",
    "h": "<blockquote>&ldquo;If you do not conquer self, you will be conquered by self.&rdquo; &mdash; <footer>Napoleon Hill</footer></blockquote>"
  },
  {
    "q": "It is important to fight and fight again, and keep fighting, for only then can evil be kept at bay though never quite eradicated.",
    "a": "Albus Dumbledore",
    "c": "129",
    "h": "<blockquote>&ldquo;It is important to fight and fight again, and keep fighting, for only then can evil be kept at bay though never quite eradicated.&rdquo; &mdash; <footer>Albus Dumbledore</footer></blockquote>"
  },
  {
    "q": "Better to live until you die.",
    "a": "Dan Millman",
    "c": "29",
    "h": "<blockquote>&ldquo;Better to live until you die.&rdquo; &mdash; <footer>Dan Millman</footer></blockquote>"
  },
  {
    "q": "A man who dares to waste one hour of time has not discovered the value of life.",
    "a": "Charles Darwin",
    "c": "79",
    "h": "<blockquote>&ldquo;A man who dares to waste one hour of time has not discovered the value of life.&rdquo; &mdash; <footer>Charles Darwin</footer></blockquote>"
  },
  {
    "q": "Ability is a poor man's wealth.",
    "a": "John Wooden",
    "c": "31",
    "h": "<blockquote>&ldquo;Ability is a poor man's wealth.&rdquo; &mdash; <footer>John Wooden</footer></blockquote>"
  },
  {
    "q": "Until you change how you get things done, you'll never know what works best.",
    "a": "Roy T. Bennett",
    "c": "76",
    "h": "<blockquote>&ldquo;Until you change how you get things done, you'll never know what works best.&rdquo; &mdash; <footer>Roy T. Bennett</footer></blockquote>"
  },
  {
    "q": "It is impossible for a man to learn what he thinks he already knows.",
    "a": "Epictetus",
    "c": "68",
    "h": "<blockquote>&ldquo;It is impossible for a man to learn what he thinks he already knows.&rdquo; &mdash; <footer>Epictetus</footer></blockquote>"
  },
  {
    "q": "In spite of everything, I shall rise again.",
    "a": "Vincent van Gogh",
    "c": "43",
    "h": "<blockquote>&ldquo;In spite of everything, I shall rise again.&rdquo; &mdash; <footer>Vincent van Gogh</footer></blockquote>"
  },
  {
    "q": "Start each day with a positive thought and a grateful heart.",
    "a": "Roy T. Bennett",
    "c": "60",
    "h": "<blockquote>&ldquo;Start each day with a positive thought and a grateful heart.&rdquo; &mdash; <footer>Roy T. Bennett</footer></blockquote>"
  },
  {
    "q": "Working hard for something we don't care about is called stress: Working hard for something we love is called passion.",
    "a": "Simon Sinek",
    "c": "118",
    "h": "<blockquote>&ldquo;Working hard for something we don't care about is called stress: Working hard for something we love is called passion.&rdquo; &mdash; <footer>Simon Sinek</footer></blockquote>"
  },
  {
    "q": "You can have results or excuses, but not both.",
    "a": "Arnold Schwarzenegger",
    "c": "46",
    "h": "<blockquote>&ldquo;You can have results or excuses, but not both.&rdquo; &mdash; <footer>Arnold Schwarzenegger</footer></blockquote>"
  },
  {
    "q": "I must also have a dark side if I am to be whole.",
    "a": "Carl Jung",
    "c": "49",
    "h": "<blockquote>&ldquo;I must also have a dark side if I am to be whole.&rdquo; &mdash; <footer>Carl Jung</footer></blockquote>"
  },
  {
    "q": "The prettiest eyes have cried the most.",
    "a": "Unknown",
    "c": "39",
    "h": "<blockquote>&ldquo;The prettiest eyes have cried the most.&rdquo; &mdash; <footer>Unknown</footer></blockquote>"
  },
  {
    "q": "Thinking is a habit, and like any other habit, it can be changed; it just takes effort and repetition.",
    "a": "John Eliot",
    "c": "102",
    "h": "<blockquote>&ldquo;Thinking is a habit, and like any other habit, it can be changed; it just takes effort and repetition.&rdquo; &mdash; <footer>John Eliot</footer></blockquote>"
  },
  {
    "q": "The busy man is never wise and the wise man is never busy.",
    "a": "Lin Yutang",
    "c": "58",
    "h": "<blockquote>&ldquo;The busy man is never wise and the wise man is never busy.&rdquo; &mdash; <footer>Lin Yutang</footer></blockquote>"
  },
  {
    "q": "The privilege of a lifetime is to become who you truly are.",
    "a": "Carl Jung",
    "c": "59",
    "h": "<blockquote>&ldquo;The privilege of a lifetime is to become who you truly are.&rdquo; &mdash; <footer>Carl Jung</footer></blockquote>"
  },
  {
    "q": "Nothing is easier than fault finding.",
    "a": "Og Mandino",
    "c": "37",
    "h": "<blockquote>&ldquo;Nothing is easier than fault finding.&rdquo; &mdash; <footer>Og Mandino</footer></blockquote>"
  },
  {
    "q": "Do not wait for leaders; do it alone, person to person.",
    "a": "Mother Teresa",
    "c": "55",
    "h": "<blockquote>&ldquo;Do not wait for leaders; do it alone, person to person.&rdquo; &mdash; <footer>Mother Teresa</footer></blockquote>"
  },
  {
    "q": "Where there is anger, there is always pain underneath.",
    "a": "Eckhart Tolle",
    "c": "54",
    "h": "<blockquote>&ldquo;Where there is anger, there is always pain underneath.&rdquo; &mdash; <footer>Eckhart Tolle</footer></blockquote>"
  },
  {
    "q": "The friend is the man who knows all about you, and still likes you.",
    "a": "Elbert Hubbard",
    "c": "67",
    "h": "<blockquote>&ldquo;The friend is the man who knows all about you, and still likes you.&rdquo; &mdash; <footer>Elbert Hubbard</footer></blockquote>"
  },
  {
    "q": "Adults are just children who earn money.",
    "a": "Kenneth Branagh",
    "c": "40",
    "h": "<blockquote>&ldquo;Adults are just children who earn money.&rdquo; &mdash; <footer>Kenneth Branagh</footer></blockquote>"
  }
];

// Creating the React component for the QuoteBox

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //console.log(this.props);
    const { quote, author, generateQuote } = this.props;
    generateQuote();
  }
  render() {
    const { quote, author, generateQuote } = this.props;
    //console.log("Quote: ", this.props);
    return (
      <div id="quote-box">
        <h1>Random Quote Generator</h1>
        <h2 id="text">{quote}</h2>
        <h3 id="author">{author}</h3>
        <button id="new-quote" onClick={generateQuote}>Generate a new Quote</button>
        <br></br>
        <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank">Tweet this!</a>
     </div>
     );
  }
};

// Setting up Redux - reducers and store

const NEW = "NEW"
const initialState = {
  quote: "",
  author: "",
}

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW:
      return {
        ...state,
        quote: action.newQuote.quote,
        author: action.newQuote.author
      };
    default:
      return state;
  }
};

const store = createStore(quoteReducer);

// Connecting React and Redux

const mapStateToProps = (state) => ({
  quote: state.quote,
  author: state.author,
});

const mapDispatchToProps = (dispatch) => ({
  generateQuote: () => {
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    const newQuote = {
      quote: quoteList[randomIndex].q,
      author: quoteList[randomIndex].a
    };
    dispatch({ type: NEW, newQuote });
  }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(QuoteBox); 

// Rendering the React component on the screen

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById("root")
);