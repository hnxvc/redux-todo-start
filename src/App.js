import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { addTodo } from './actions/actions';

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
        <button onClick={()=> store.dispatch(addTodo(1, 'Ve Nha', 0))}>Add todo</button>
      </div>
    );
  }
}

export default App;
