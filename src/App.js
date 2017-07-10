import React, { Component } from 'react';
import {
  addTodo, toggleTodo, removeTodo,
  showAllTodo, showCompletedTodo, showActiveTodo
} from './actions/actions';
import classNames from 'classnames';
import * as Constants from './constants/general';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  render() {
    return (
      <div className="App">
        <TodoAdd
          txtTodo={this.state.txtTodo}
          onInputChange={this.onInputChange.bind(this)}
          addTodo={
            () => {
              this.props.addTodo(uuidv1(), this.state.txtTodo, false) ;
              this.setState({
                txtTodo: ''
              });
            }
          }
        />
        <Todos
          visibleTodos={this.props.todos}
          toggleTodo={(id) => {
            this.props.toggleTodo(id);
          }}
          removeTodo={(id) => {
            this.props.removeTodo(id);
          }}
        />
        <Footer
          filter={this.props.filter}
          showAllTodo={() => {
            this.props.showAllTodo();
          }}
          showActiveTodo={() => {
            this.props.showActiveTodo();
          }}
          showCompletedTodo={() => {
            this.props.showCompletedTodo();
          }}
        />
      </div>
    );
  }
}

const getVisibleTodo = (filter, todos) => {
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

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodo(
      state.filter,
      state.todos
    ),

    filter : state.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo : (id, txtTodo, completed) => {
      dispatch(addTodo(id, txtTodo, completed)) ;
    },

    toggleTodo : id => {
      dispatch(toggleTodo(id));
    },

    removeTodo: id => {
      dispatch(removeTodo(id));
    },

    showAllTodo: () => {
      dispatch(showAllTodo());
    },

    showActiveTodo: () => {
      dispatch(showActiveTodo());
    },

    showCompletedTodo: () => {
      dispatch(showCompletedTodo());
    }
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
