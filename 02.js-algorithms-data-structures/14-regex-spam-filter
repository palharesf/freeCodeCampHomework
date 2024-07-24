// Exercise permalink: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/learn-regular-expressions-by-building-a-spam-filter/step-1

script.js

const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");

const helpRegex = /please help|assist me/i;											// The alternate sequence | can be used to match either the text on the left or the text on the right of the |. For example, the regular expression /yes|no/ will match either yes or no
const dollarRegex = /[0-9]+ (?:hundred|thousand|million|billion)? dollars/i;		// A character class is defined by square brackets, and matches any character within the brackets. For example, [aeiou] matches any character in the list aeiou. You can also define a range of characters to match using a hyphen. For example, [a-z] matches any character from a to z. The + quantifier can be used to match one or more consecutive occurrences of a digit or letter. For example, the regular expression /a+/ matches one or more consecutive a characters
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;						// A capture group is a way to define a part of the expression that should be captured and saved for later reference. You can define a capture group by wrapping a part of your expression in parentheses. For example, /h(i|ey) camper/ would match either hi camper or hey camper, and would capture i or ey in a group. Now that you have your capture group, you can mark the entire pattern as an optional match. The ? quantifier matches zero or one occurrence of the preceding character or group. For example, the regular expression /colou?r/ matches both color and colour, because the u is optional
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;			// To create a non-capturing group in a regular expression, you can add ?: after the opening parenthesis of a group. For instance, (?:a|b) will match either a or b, but it will not capture the result. Capturing results are used in match and saved in the resulting array, while non-capturing groups are used in matching but not kept as results in the outcome array. You can match spaces using the meta character \s, which will match spaces, tabs, and line breaks
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;						// To match the beginning of the text, you can use the ^ anchor. This asserts that your pattern match starts at the beginning of the full string. Like the ^ anchor, you can use the $ anchor to match the end of the string

const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// Arrays have a .some() method. Like the .filter() method, .some() accepts a callback function which should take an element of the array as the argument. The .some() method will return true if the callback function returns true for at least one element in the array
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));					// Strings have a .match() method, which accepts a regular expression as an argument and determines if the string matches that expression. Instead of using the .match() method, you can use the .test() method of a regular expression to test if a string matches the pattern. Unlike .match(), .test() returns a boolean value indicating whether or not the string matches the pattern	

checkMessageButton.addEventListener("click", () => {
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }

  result.textContent = isSpam(messageInput.value)									// You can assign the result of a ternary operator to an element's text content: el.textContent = condition ? "Use this text if the condition is true" : "Use this text if the condition is false";
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  messageInput.value = "";
});




index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Learn Regular Expressions by Building a Spam Filter</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <header class="main-text">
      <h1 class="title">Is this Spam?</h1>
      <p class="description">
        Enter a phrase to check if it would be marked as spam or not.
      </p>
    </header>

    <main>
      <label class="message-label" for="message-input">Message: </label>
      <textarea
        placeholder="Enter message here"
        value=""
        type="text"
        name="message"
        id="message-input"
        rows="10"
        cols="40"
      ></textarea>
      <button class="btn" id="check-message-btn" type="button">
        Check message
      </button>
      <p id="result"></p>
    </main>

    <footer class="footer">&copy; freeCodeCamp</footer>
    <script src="./script.js"></script>
  </body>
</html>




styles.css

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --dark-grey: #1b1b32;
  --light-grey: #f5f6f7;
  --golden-yellow: #fecc4c;
  --yellow: #ffcc4c;
  --gold: #feac32;
  --orange: #ffac33;
  --dark-orange: #f89808;
}

body {
  background-color: var(--dark-grey);
  color: var(--light-grey);
}

body,
#message-input:placeholder-shown {
  text-align: center;
}

textarea {
  max-width: 90%;
}

.main-text {
  margin: 25px 0;
}

.title {
  font-size: 2.5rem;
}

.description {
  margin-top: 15px;
  font-size: 1.4rem;
}

.message-label {
  display: block;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

#message-input:placeholder-shown,
textarea {
  font-size: 1.1rem;
}

.btn {
  display: block;
  cursor: pointer;
  width: 200px;
  margin: 10px auto;
  color: var(--dark-grey);
  background-color: var(--gold);
  background-image: linear-gradient(var(--golden-yellow), var(--orange));
  border-color: var(--gold);
  border-width: 3px;
}

.btn:hover {
  background-image: linear-gradient(var(--yellow), var(--dark-orange));
}

#result {
  font-size: 2rem;
  margin: 20px 0;
}

.footer {
  margin-top: 10px;
}



