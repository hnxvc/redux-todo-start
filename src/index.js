import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import rootReducer from './data/reduder';

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

const render = () => {
  ReactDOM.render(
    <App
      todos={store.getState().todos}
      dispatch={store.dispatch}
    />,
    document.getElementById('root'));
};

store.subscribe(render);
render();

registerServiceWorker();
