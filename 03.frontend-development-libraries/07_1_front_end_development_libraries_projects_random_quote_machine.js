// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-random-quote-machine
// Example solution: https://random-quote-machine.freecodecamp.rocks/
// You can build the solution using CodePen: https://codepen.io/pen?template=MJjpwO

//If you want to make sure your project is not failing because of React 18 start by using the old render method

import ReactDOM from "react-dom";
import App from "./App";
ReactDOM.render(<App />,  document.getElementById("root"));

// If that doesn't help downgrade to React 17