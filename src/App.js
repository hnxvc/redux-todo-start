import React, { Component } from 'react';
import {
  addTodo, toggleTodo, removeTodo,
  showAllTodo, showCompletedTodo, showActiveTodo
} from './actions/actions';
import classNames from 'classnames';
import * as Constants from './constants/general';
import PropTypes from 'prop-types';
const uuidv1 = require('uuid/v1');

const FilterLink = (props) => {
  if(props.type === props.filter) {
    return <span>{props.children}</span>
  }
  return(
    <a href="#"
      className="filter__item"
      onClick={e => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.children}
    </a>
  )
}

const Todo = ({todo, toggleTodo, removeTodo}) => {
  let todoClass = classNames(
    'todo',
    {'todo--complete': todo.complete}
  );
  return(
    <li
      className={todoClass}
      key={todo.id}
      onClick={() => toggleTodo(todo.id)}
    >
      {todo.text}
      <button
        onClick={() => removeTodo(todo.id)}
      >
        x
      </button>
    </li>
  );
}

const Todos = ({visibleTodos, toggleTodo, removeTodo}) => {
  return (
    <ul>
      {
        visibleTodos.map(todo => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          );
        })
      }
    </ul>
  )
}

const TodoAdd = ({txtTodo, onInputChange, addTodo}) => {
  return(
    <div>
      <input type="text"
        value={txtTodo}
        onChange={onInputChange}
      />
      <button onClick={addTodo}>Add todo</button>
    </div>

  )
}

const Footer = (
  { filter, showAllTodo, showActiveTodo, showCompletedTodo }
) => {
  return(
    <div className="filter">
      Show{" "}
      <FilterLink
        children="All"
        onClick={showAllTodo}
        type={Constants.SHOW_ALL}
        filter={filter}
      />

      <FilterLink
        children="Active"
        onClick={showActiveTodo}
        type={Constants.SHOW_ACTIVE}
        filter={filter}
      />

      <FilterLink
        children="Complete"
        onClick={showCompletedTodo}
        type={Constants.SHOW_COMPLETED}
        filter={filter}
      />
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtTodo : ''
    }
  }

  onInputChange(e) {
    this.setState({
      txtTodo: e.target.value
    });
  }

  removeTodo(id) {
    this.props.dispatch(removeTodo(id));
  }

  showAllTodo() {
    this.props.dispatch(showAllTodo());
  }

  showActiveTodo() {
    this.props.dispatch(showActiveTodo());
  }

  showCompletedTodo() {
    this.props.dispatch(showCompletedTodo());
  }

  getVisibleTodo(filter, todos) {
    switch(filter) {
      case Constants.SHOW_ALL:
        return todos;

      case Constants.SHOW_COMPLETED:
        return todos.filter(todo => todo.complete);

      case Constants.SHOW_ACTIVE:
        return todos.filter(todo => !todo.complete);

      default:
        return todos;
    }
  }

  render() {
    const { store } = this.context;

    let todos = store.getState().todos;
    let filter = store.getState().filter;

    const visibleTodos = this.getVisibleTodo(filter, todos);

    return (
      <div className="App">
        <TodoAdd
          txtTodo={this.state.txtTodo}
          onInputChange={this.onInputChange.bind(this)}
          addTodo={
            () => {
              store.dispatch(addTodo(uuidv1(), this.state.txtTodo, false)) ;
              this.setState({
                txtTodo: ''
              });
            }
          }
        />
        <Todos
          visibleTodos={visibleTodos}
          toggleTodo={(id) => {
            store.dispatch(toggleTodo(id));
          }}
          removeTodo={(id) => {
            store.dispatch(removeTodo(id));
          }}
        />
        <Footer
          filter={filter}
          showAllTodo={() => {
            store.dispatch(showAllTodo());
          }}
          showActiveTodo={() => {
            store.dispatch(showActiveTodo());
          }}
          showCompletedTodo={() => {
            store.dispatch(showCompletedTodo());
          }}
        />
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default App;
