import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'

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

console.log('REMOVEME ----- store', store.getState());

store.dispatch({
  type: 'TEST',
  data: {
    name: 'Nguyen',
    age: 20
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
