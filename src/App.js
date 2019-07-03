import React from "react";
import InputText from "./components/inputText";
import TodosList from "./components/todosList";
import Footer from "./components/footer";
import { fetchToDos } from "./Api";
import loading from "./img/loadingbar.gif";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: null,
      filter: "",
      loading: false
    };
  }

  upDateList = todo => {
    this.setState({
      todos: [...this.state.todos, todo]
    });
  };

  upDateTodo = updateTodo => {
    const doneTodo = this.state.todos.map(todo => {
      if (todo.id === updateTodo.id) {
        return updateTodo;
      } else {
        return todo;
      }
    });
    this.setState({
      todos: doneTodo
    });
  };

  getFilter = val => {
    this.setState({
      filter: val
    });
  };

  isLoading = flag => {
    this.setState({
      loading: flag
    });
  };

  async componentDidMount() {
    const data = [...(await fetchToDos())];
    this.setState({
      todos: data
    });
  }

  render() {
    return (
      <div className="todo-container">
        <InputText upDateList={this.upDateList} isLoading={this.isLoading} />
        <TodosList
          todos={this.state.todos}
          filter={this.state.filter}
          upDateTodo={this.upDateTodo}
          isLoading={this.isLoading}
        />
        <Footer filter={this.getFilter} />
        {this.state.loading ? (
          <div className="loading-container">
            <img className="todos-loadingbar" src={loading} alt="loadingbar" />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
