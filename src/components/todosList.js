import React from "react";
import Todo from "./todo";
import { updateDone } from "../Api";
import loading from "../img/loading.gif";
import "../App.css";

export default class TodosList extends React.Component {
  handleOnClick = id => {
    this.props.isLoading(true);
    updateDone(id).then(todo => {
      this.props.isLoading(false);
      this.props.upDateTodo(todo);
    });
  };
  get visibleTodos() {
    const { todos, filter } = this.props;
    return (
      todos &&
      todos.filter(todo => {
        if (filter === "Active") {
          return !todo.done;
        }
        if (filter === "Done") {
          return todo.done;
        }
        return true;
      })
    );
  }
  render() {
    const { visibleTodos } = this;
    return (
      <div className="todo-container">
        {visibleTodos ? (
          <div className="todos-container">
            {visibleTodos.map(todo => {
              return (
                <Todo
                  value={todo}
                  onClick={id => this.handleOnClick(id)}
                  key={todo.id}
                />
              );
            })}
          </div>
        ) : (
          <div className="loading-container">
            <img className="todos-loading" src={loading} alt="loading" />
          </div>
        )}
      </div>
    );
  }
}