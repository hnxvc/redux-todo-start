import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/actionTypes';
import * as Constants from '../constants/general';


const todosReducer = (todos = [], action) => {
  switch(action.type) {
    case ActionTypes.ADD_TODO:
      // return state.concat([action.data]);
      return [
        ...todos,
        action.data
      ];

    case ActionTypes.TOGGLE_TODO:
      let id = action.data.id;
      return todos.map(todo => {
        if(todo.id !== id) {
          return todo
        }
        return {
          ...todo,
          complete: !todo.complete
        }
      });

    case ActionTypes.REMOVE_TODO:
      let index = todos.findIndex(todo => todo.id === action.data.id);

      return [
        ...todos.slice(0, index),
        ...todos.slice(index+1)
      ];

    default:
      return todos;
  }
}

const filterReducer = (filter = Constants.SHOW_ALL, action) => {
  switch(action.type) {
    case ActionTypes.SET_VISIBILTY_FILTER:
      return action.data.filter;

    default:
      return filter;
  }
}

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
});

export default rootReducer;
