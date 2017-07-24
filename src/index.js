import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import rootReducer from './data/reduder';
import { Provider } from 'react-redux';

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

// class Provider extends Component {
//
//   getChildContext() {
//     return {store: this.props.store};
//   }
//
//   render() {
//     return this.props.children;
//   }
// }
//
// Provider.childContextTypes = {
//   store: PropTypes.object
// }

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root'));
};

// store.subscribe(render);
render();

registerServiceWorker();
