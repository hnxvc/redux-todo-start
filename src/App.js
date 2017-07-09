import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { addTodo, toggleTodo, removeTodo } from './actions/actions';

import rootReducer from './data/reduder';

const initialState = [
  {
    name: 'Hoa Than'
  }
]
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(logger)
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <button onClick={()=> store.dispatch(addTodo(1, 'Ve Nha', false))}>Add todo</button>
        <button onClick={()=> store.dispatch(toggleTodo(1))}>Toggle todo</button>
        <button onClick={()=> store.dispatch(removeTodo(1))}>Remove todo</button>
      </div>
    );
  }
}

export default App;
