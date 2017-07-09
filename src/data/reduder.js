import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/actionTypes';


const rootReducer = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.ADD_TODO:
      return state.concat([action.data]);
    default:
      return state;
  }
}

export default rootReducer;
