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
      })
    default:
      return state;
  }
}

export default rootReducer;
