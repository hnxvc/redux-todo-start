import * as ActionTypes from '../constants/actionTypes';

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
