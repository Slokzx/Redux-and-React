// To use this index.js only change the entry in the webpack to index.js
// the output is bundle.js. Check the diagram in the folder
// It also has first and app.js which are the two scripts
// first is the crud and app is calculator
// this code explains
//    -how to use es6
//    -how to use Reducers
//    -how to combine two Reducers
//    -how to use middleware
//    -how to make middlewares and use default ones
import { createStore, combineReducers, applyMiddleware } from 'redux';
// this is the external middleware installed by npm install --save redux-logger
import logger from 'redux-logger';
// import for async actions
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import First from './First';
// the functions to look for are
// createStore, getState, dispatch and subscribe

////////////////////////////////////////////////////Reducer////////////////////////////////////////
//will check if the state is defined or not  so that no need to mention in the create No need to pass state
function counterReducer(state = { count: 0}, action){
  const nextState={
    count: state.count
  }
  switch(action.type){
    case 'ADD':
      nextState.count = state.count + 1;
      return nextState;
      // console.log(action)
      break;
    case 'SUB':
      nextState.count = state.count - 1;
      return nextState;
      // console.log(action)
      break;
    case 'RESET':
      nextState.count = 0;
      return nextState;
      // console.log(action)
      break;
    default:
      //console.log('In default');
      return state;
  }
}

/////////////////////////////////////////////////////ToDoreducer////////////////////////////////////
function todosReducer(state = { todos: [] }, action) {
    // todos:[] is a default parameter
    // this statement will clone the state into nextState
	const nextState = Object.assign({}, state);

	switch (action.type) {
		case 'NEW':
			nextState.todos.push(action.payload)
			return nextState;
			break;
		case 'DELETE':
			nextState.todos.pop();
			return nextState;
			break;
		case 'DELETE_ALL':
			nextState.todos = []
			return nextState;
			break;
		default:
			return state
	}
}

////////////////////////////////////////////////////middleware//////////////////////////////////////
// middleware is a function between two functions
// in redux it comes between the action and the dispatch
const logger_internal = store => next => action => {
  console.log('dispatching', action);
  // next is a function called between two functions
  // in this code it displays the next state
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

// This is the second middleware where it will give an error when action blah
// is selected since there is no action blah created.
const error = store => next => action => {
  console.log('new action', action);
  // action = 'blah'
  try {
    next(action)
  } catch(error) {
    console.log('error')
  }
}

/////////////////////////////////////////////////////store//////////////////////////////////////////
const store = createStore(combineReducers({ counterReducer: counterReducer ,todosReducer: todosReducer}),
 applyMiddleware(logger,logger_internal, error));
// you have to pass the middleware when creating the store. External middleware needs to be invoked.(not required in recent update)
// more middlewares can be passed just by adding it with a comma.
//const store = Redux.createStore(Redux.combineReducers({ counterReducer: counterReducer ,todosReducer: todosReducer}));
//const store = Redux.createStore(counterReducer);
//you can pass as many reducers you want through the redux
//function of combineReducers
const counterEl = document.getElementById('counter');
//console.log(store);
// todo store added
const todosInput = document.getElementById('todos');
const todosList = document.getElementById('todosList');

function render(){
//console.log('In render');
//console.log(store.getState());
  const state = store.getState();
  //you have to change the state.count since now state has 2 objects
  //therefore you have to use counterReducer.count to call the
  //object.
  // console.log(counterEl.innerHTML);
  // console.log(state.count);
  counterEl.innerHTML = state.counterReducer.count.toString();

renderList(state);
}

function renderList(state){
    todosList.innerHTML = '';
    for (var i = 0; i < state.todosReducer.todos.length; i++) {
      const li = document.createElement('li');
      const todo = state.todosReducer.todos[i];
      li.innerHTML = todo.toString()
      todosList.appendChild(li);
    }
}

//Will display the default state. No need to hard code it
// It will get called(the function render )every time an action
// (depends onthe type) gets dispatched
render()
store.subscribe(render)

//////////////////////////////////////////////////Actions////////////////////////////////////////
document.getElementById('add')
  // .addEventListener('click',function(){ it was like this before es6
  .addEventListener('click', () =>{
    store.dispatch({type: 'ADD'})
  })

document.getElementById('sub')
  .addEventListener('click', () =>{
    store.dispatch({type: 'SUB'})
  })

document.getElementById('reset')
  .addEventListener('click', () =>{
    store.dispatch({type: 'RESET'})
  })

//////////////////////////////////////////////////Todo ACTIONS//////////////////////////////////////
document.getElementById('new')
  .addEventListener('click', () =>{
    store.dispatch({type: 'NEW', payload: todosInput.value})
    // when ever you want to pass with an action we use payload.
  })

document.getElementById('delete')
  .addEventListener('click', () =>{
    store.dispatch({type: 'DELETE'})
  })

document.getElementById('delete_all')
  .addEventListener('click', () =>{
    store.dispatch({type: 'DELETE_ALL'})
  })

ReactDOM.render(<App />, document.getElementById('App'));
ReactDOM.render(<First />, document.getElementById('First'));
