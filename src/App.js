import React, { Component } from 'react';
import {
  addTodo, toggleTodo, removeTodo,
  showAllTodo, showCompletedTodo, showActiveTodo
} from './actions/actions';

import classNames from 'classnames';
const uuidv1 = require('uuid/v1');

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

  showAllTodo(e) {
    e.preventDefault();
    this.props.dispatch(showAllTodo());
  }

  showActiveTodo(e) {
    e.preventDefault();
    this.props.dispatch(showActiveTodo());
  }

  showCompletedTodo(e) {
    e.preventDefault();
    this.props.dispatch(showCompletedTodo());
  }

  render() {

    return (
      <div className="App">
        <input type="text"
          value={this.state.txtTodo}
          onChange={this.onInputChange.bind(this)}
        />
        <button onClick={this.addTodo.bind(this)}>Add todo</button>
        <ul>
          {
            this.props.todos.map(todo => {
              let todoClass = classNames(
                'todo',
                {'todo--complete': todo.complete}
              );
              return (
                <li
                  className={todoClass}
                  key={todo.id}
                  onClick={this.toggleTodo.bind(this, todo.id)}
                >
                  {todo.text}
                  <button
                    onClick={this.removeTodo.bind(this, todo.id)}
                  >
                    x
                  </button>
                </li>
              );
            })
          }
        </ul>

        <div>
          Show{" "}
          <a href="#all" onClick={this.showAllTodo.bind(this)}>All</a>{" "}
          <a href="#active" onClick={this.showActiveTodo.bind(this)}>Active</a>{" "}
          <a href="#complete" onClick={this.showCompletedTodo.bind(this)}>Complete</a>
        </div>

      </div>
    );
  }
}

export default App;
