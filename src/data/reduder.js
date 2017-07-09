import * as ActionTypes from '../constants/actionTypes';


const rootReducer = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.ADD_TODO:
      // return state.concat([action.data]);
      return [
        ...state,
        action.data
      ];

    case ActionTypes.TOGGLE_TODO:
      let id = action.data.id;
      return state.map(todo => {
        if(todo.id !== id) {
          return todo
        }
        return {
          ...todo,
          complete: !todo.complete
        }
      });

    case ActionTypes.REMOVE_TODO:
      let index = state.findIndex(todo => todo.id === action.data.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index+1)
      ];

    default:
      return state;
  }
}

export default rootReducer;
