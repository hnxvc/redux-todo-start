import * as ActionTypes from '../constants/actionTypes';
import * as Constants from '../constants/general';

export const addTodo = (id, text, complete) => {
  return {
    type: ActionTypes.ADD_TODO,
    data: {
      id,
      text,
      complete
    }
  }
}

export const toggleTodo = (id) => {
  return {
    type: ActionTypes.TOGGLE_TODO,
    data: {
      id
    }
  }
}

export const removeTodo = (id) =>{
  return {
    type: ActionTypes.REMOVE_TODO,
    data: {
      id
    }
  }
}

export const showAllTodo = () => {
  return {
    type: ActionTypes.SET_VISIBILTY_FILTER,
    data: {
      filter: Constants.SHOW_ALL
    }
  }
}

export const showCompletedTodo = () => {
  return {
    type: ActionTypes.SET_VISIBILTY_FILTER,
    data: {
      filter: Constants.SHOW_COMPLETED
    }
  }
}

export const showActiveTodo = () => {
  return {
    type: ActionTypes.SET_VISIBILTY_FILTER,
    data: {
      filter: Constants.SHOW_ACTIVE
    }
  }
}
