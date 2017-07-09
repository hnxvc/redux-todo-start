import React, { Component } from 'react';
import { addTodo, toggleTodo, removeTodo } from './actions/actions';
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

  removeTodo() {
    this.props.dispatch(removeTodo(1));
  }

  render() {

    return (
      <div className="App">
        <input type="text"
          value={this.state.txtTodo}
          onChange={this.onInputChange.bind(this)}
        />
        <button onClick={this.addTodo.bind(this)}>Add todo</button>
        <button onClick={this.removeTodo.bind(this)}>Remove todo</button>

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
                </li>
              );
            })
          }
        </ul>

      </div>
    );
  }
}

export default App;
