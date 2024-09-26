// Exercise permalink: https://www.freecodecamp.org/learn/front-end-development-libraries/redux/create-a-redux-store

/* Redux is a state management framework that can be used with a number of different web technologies, including React.
In Redux, there is a single state object that's responsible for the entire state of your application.
This means if you had a React app with ten components, and each component had its own local state, the entire state of your app would be defined by a single state object housed in the Redux store.
This is the first important principle to understand when learning Redux: the Redux store is the single source of truth when it comes to application state.
This also means that any time any piece of your app wants to update state, it must do so through the Redux store.
The unidirectional data flow makes it easier to track state management in your app. 
There is a method called createStore() on the Redux object, which you use to create the Redux store. This method takes a reducer function as a required argument. */

const reducer = (state = 5) => {
  return state;
}

const store = Redux.createStore(reducer)





/* The Redux store object provides several methods that allow you to interact with it.
For example, you can retrieve the current state held in the Redux store object with the getState() method. */

const store = Redux.createStore(
  (state = 5) => state
);

const currentState = store.getState()





/* In Redux, all state updates are triggered by dispatching actions. An action is simply a JavaScript object that contains information about an action event that has occurred.
The Redux store receives these action objects, then updates its state accordingly. Sometimes a Redux action also carries some data.
For example, the action carries a username after a user logs in. While the data is optional, actions must carry a type property that specifies the 'type' of action that occurred.
Think of Redux actions as messengers that deliver information about events happening in your app to the Redux store.
The store then conducts the business of updating state based on the action that occurred. 
After creating an action, the next step is sending the action to the Redux store so it can update its state.
In Redux, you define action creators to accomplish this. An action creator is simply a JavaScript function that returns an action.
In other words, action creators create objects that represent action events. */

const action = {
  type: 'LOGIN'
}

function actionCreator() {return action};





/* dispatch method is what you use to dispatch actions to the Redux store.
Calling store.dispatch() and passing the value returned from an action creator sends an action back to the store.
Recall that action creators return an object with a type property that specifies the type of action that has occurred.
Then the method dispatches an action object to the Redux store.
Based on the previous challenge's example, the following lines are equivalent, and both dispatch the action of type LOGIN:

store.dispatch(actionCreator());
store.dispatch({ type: 'LOGIN' }); */

const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

store.dispatch(loginAction())





/* After an action is created and dispatched, the Redux store needs to know how to respond to that action.
This is the job of a reducer function. Reducers in Redux are responsible for the state modifications that take place in response to actions.
A reducer takes state and action as arguments, and it always returns a new state. It is important to see that this is the only role of the reducer.
The reducer is simply a pure function that takes state and action, then returns new state.
Another key principle in Redux is that state is read-only. In other words, the reducer function must always return a new copy of state and never modify state directly.
Redux does not enforce state immutability, however, you are responsible for enforcing it in the code of your reducer functions. */

const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {
  if (action.type === "LOGIN") {
    return {
      login: true
    };
  } else {
    return state;
  }
};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};




/* You can tell the Redux store how to handle multiple action types.
Say you are managing user authentication in your Redux store. You want to have a state representation for when users are logged in and when they are logged out.
You represent this with a single state object with the property authenticated.
You also need action creators that create actions corresponding to user login and user logout, along with the action objects themselves. */

const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {authenticated: true};
    case "LOGOUT":
      return {authenticated: false};
    default: return state;
  }
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};





/* A common practice when working with Redux is to assign action types as read-only constants, then reference these constants wherever they are used. 
You can refactor the code you're working with to write the action types as const declarations. */

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {

  switch (action.type) {
    case LOGIN: 
      return {
        authenticated: true
      }
    case LOGOUT: 
      return {
        authenticated: false
      }

    default:
      return state;

  }

};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: LOGIN
  }
};

const logoutUser = () => {
  return {
    type: LOGOUT
  }
};






/* Another method you have access to on the Redux store object is store.subscribe().
This allows you to subscribe listener functions to the store, which are called whenever an action is dispatched against the store.
One simple use for this method is to subscribe a function to your store that simply logs a message every time an action is received and the store is updated. */

const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

let count = 0;

function callBack() {
  return count++;
}
store.subscribe(callBack());

store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);




/* When the state of your app begins to grow more complex, it may be tempting to divide state into multiple pieces.
Instead, remember the first principle of Redux: all app state is held in a single state object in the store.
Therefore, Redux provides reducer composition as a solution for a complex state model.
You define multiple reducers to handle different pieces of your application's state, then compose these reducers together into one root reducer.
The root reducer is then passed into the Redux createStore() method. In order to let us combine multiple reducers together, Redux provides the combineReducers() method.
This method accepts an object as an argument in which you define properties which associate keys to specific reducer functions.
The name you give to the keys will be used by Redux as the name for the associated piece of state.
Typically, it is a good practice to create a reducer for each piece of application state when they are distinct or unique in some way.
For example, in a note-taking app with user authentication, one reducer could handle authentication while another handles the text and notes that the user is submitting.
For such an application, we might write the combineReducers() method like this:

const rootReducer = Redux.combineReducers({
  auth: authenticationReducer,
  notes: notesReducer
});

Now, the key notes will contain all of the state associated with our notes and handled by our notesReducer.
This is how multiple reducers can be composed to manage more complex application state.
In this example, the state held in the Redux store would then be a single object containing auth and notes properties. */

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers({
  auth: authReducer,
  count: counterReducer
});

const store = Redux.createStore(rootReducer);




/* By now you've learned how to dispatch actions to the Redux store, but so far these actions have not contained any information other than a type.
You can also send specific data along with your actions.
In fact, this is very common because actions usually originate from some user interaction and tend to carry some data with them.
The Redux store often needs to know about this data. */

const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    case ADD_NOTE:
      return action.text;
    default:
      return state;
  }
};

const addNoteText = (note) => {
  return {
    type: ADD_NOTE,
    text: note
  }
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello!'));
console.log(store.getState());




/* So far these challenges have avoided discussing asynchronous actions, but they are an unavoidable part of web development.
At some point you'll need to call asynchronous endpoints in your Redux app, so how do you handle these types of requests?
Redux provides middleware designed specifically for this purpose, called Redux Thunk middleware. Here's a brief description how to use this with Redux.
To include Redux Thunk middleware, you pass it as an argument to Redux.applyMiddleware(). This statement is then provided as a second optional parameter to the createStore() function.
Then, to create an asynchronous action, you return a function in the action creator that takes dispatch as an argument.
Within this function, you can dispatch actions and perform asynchronous requests.
In this example, an asynchronous request is simulated with a setTimeout() call.
It's common to dispatch an action before initiating any asynchronous behavior so that your application state knows that some data is being requested (this state could display a loading icon, for instance).
Then, once you receive the data, you dispatch another action which carries the data as a payload along with information that the action is completed.
Remember that you're passing dispatch as a parameter to this special action creator.
This is what you'll use to dispatch your actions, you simply pass the action directly to dispatch and the middleware takes care of the rest. */

const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

const handleAsync = () => {
  return function(dispatch) {
    store.dispatch(requestingData());
    setTimeout(function() {
      let data = {
        users: ['Jeff', 'William', 'Alice']
      }
      store.dispatch(receivedData(data))
    }, 2500);
  }
};

const defaultState = {
  fetching: false,
  users: []
};

const asyncDataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: []
      }
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users
      }
    default:
      return state;
  }
};

const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);





/* Now you've learned all the core principles of Redux!
You've seen how to create actions and action creators, create a Redux store, dispatch your actions against the store, and design state updates with pure reducers.
You've even seen how to manage complex state with reducer composition and handle asynchronous actions.
These examples are simplistic, but these concepts are the core principles of Redux. If you understand them well, you're ready to start building your own Redux app.
The next challenges cover some of the details regarding state immutability, but first, here's a review of everything you've learned so far. */

const INCREMENT = "INCREMENT"; // Define a constant for increment action types
const DECREMENT = "DECREMENT"; // Define a constant for decrement action types

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}; // Define the counter reducer which will increment or decrement the state based on the action it receives

const incAction = () => {return {type: INCREMENT}
}; // Define an action creator for incrementing

const decAction = () => {return {type: DECREMENT}
}; // Define an action creator for decrementing

const store = Redux.createStore(counterReducer); // Define the Redux store here, passing in your reducers




/* These final challenges describe several methods of enforcing the key principle of state immutability in Redux.
Immutable state means that you never modify state directly, instead, you return a new copy of state.
If you took a snapshot of the state of a Redux app over time, you would see something like state 1, state 2, state 3,state 4, ... and so on where each state may be similar to the last, but each is a distinct piece of data.
This immutability, in fact, is what provides such features as time-travel debugging that you may have heard about.
Redux does not actively enforce state immutability in its store or reducers, that responsibility falls on the programmer.
Fortunately, JavaScript (especially ES6) provides several useful tools you can use to enforce the immutability of your state, whether it is a string, number, array, or object.
Note that strings and numbers are primitive values and are immutable by nature. In other words, 3 is always 3. You cannot change the value of the number 3.
An array or object, however, is mutable.
In practice, your state will probably consist of an array or object, as these are useful data structures for representing many types of information. */

const ADD_TO_DO = 'ADD_TO_DO';

const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch(action.type) {
    case ADD_TO_DO:
      return state = state.concat(action.todo);
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo
  }
}

const store = Redux.createStore(immutableReducer);




/* One solution from ES6 to help enforce state immutability in Redux is the spread operator: ...
The spread operator has a variety of applications, one of which is well-suited to the previous challenge of producing a new array from an existing array.
This is relatively new, but commonly used syntax. For example, if you have an array myArray and write:

let newArray = [...myArray];

newArray is now a clone of myArray. Both arrays still exist separately in memory. If you perform a mutation like newArray.push(5), myArray doesn't change.
The ... effectively spreads out the values in myArray into a new array.
To clone an array but add additional values in the new array, you could write [...myArray, 'new value']. This would return a new array composed of the values in myArray and the string new value as the last value.
The spread syntax can be used multiple times in array composition like this, but it's important to note that it only makes a shallow copy of the array.
That is to say, it only provides immutable array operations for one-dimensional arrays. */

const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch(action.type) {
    case 'ADD_TO_DO':
      return state = [...state, action.todo]
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: 'ADD_TO_DO',
    todo
  }
}

const store = Redux.createStore(immutableReducer);




// Time to practice removing items from an array. The spread operator can be used here as well. Other useful JavaScript methods include slice() and concat().

const immutableReducer = (state = [0,1,2,3,4,5], action) => {
  switch(action.type) {
    case 'REMOVE_ITEM':
      return state = state.slice(0,action.index).concat(state.slice(action.index + 1,state.length));
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index
  }
}

const store = Redux.createStore(immutableReducer);





/* The last several challenges worked with arrays, but there are ways to help enforce state immutability when state is an object, too.
A useful tool for handling objects is the Object.assign() utility.
Object.assign() takes a target object and source objects and maps properties from the source objects to the target object.
Any matching properties are overwritten by properties in the source objects.
This behavior is commonly used to make shallow copies of objects by passing an empty object as the first argument followed by the object(s) you want to copy. Here's an example:

const newObject = Object.assign({}, obj1, obj2);

This creates newObject as a new object, which contains the properties that currently exist in obj1 and obj2. */

const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp'
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ONLINE':
      return state = Object.assign({},state,{status: "online"})
    default:
      return state;
  }
};

const wakeUp = () => {
  return {
    type: 'ONLINE'
  }
};

const store = Redux.createStore(immutableReducer);
