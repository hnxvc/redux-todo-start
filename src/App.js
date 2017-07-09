import React, { Component } from 'react';
import {
  addTodo, toggleTodo, removeTodo,
  showAllTodo, showCompletedTodo, showActiveTodo
} from './actions/actions';
import classNames from 'classnames';
import * as Constants from './constants/general';

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

  addTodo() {
    let id = uuidv1();
    this.props.dispatch(addTodo(id, this.state.txtTodo, false));
    this.setState({
      txtTodo: ''
    });
  }

  toggleTodo(id) {
    this.props.dispatch(toggleTodo(id));
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
    let todos = this.props.todos;
    let filter = this.props.filter;

    const visibleTodos = this.getVisibleTodo(filter, todos);

    return (
      <div className="App">
        <TodoAdd
          txtTodo={this.state.txtTodo}
          onInputChange={this.onInputChange.bind(this)}
          addTodo={this.addTodo.bind(this)}
        />
        <Todos
          visibleTodos={visibleTodos}
          toggleTodo={this.toggleTodo.bind(this)}
          removeTodo={this.removeTodo.bind(this)}
        />
        <div className="filter">
          Show{" "}
          <FilterLink
            children="All"
            onClick={this.showAllTodo.bind(this)}
            type={Constants.SHOW_ALL}
            filter={filter}
          />

          <FilterLink
            children="Active"
            onClick={this.showActiveTodo.bind(this)}
            type={Constants.SHOW_ACTIVE}
            filter={filter}
          />

          <FilterLink
            children="Complete"
            onClick={this.showCompletedTodo.bind(this)}
            type={Constants.SHOW_COMPLETED}
            filter={filter}
          />
        </div>

      </div>
    );
  }
}

export default App;
