import React from 'react';
import { addTodo } from '../Api';
import '../App.css';

var keygen = require('keygenerator');

export default class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  handleOnChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleOnKeyPress = (e) => {
    const { isLoading, upDateList } = this.props;
    if (e.key === 'Enter') {
      addTodo({
        text: e.target.value,
        done: false,
        id: keygen._()
      }).then(newTodo => {
        this.setState({
          input: ''
        });
        isLoading(false);
        upDateList(newTodo);
      });
      isLoading(true);
    }
  }
  render() {
    return (
      <div className="todo-container">
        <h1>ToDo List</h1>
        <input
          id="input"
          type="text"
          onKeyPress={this.handleOnKeyPress}
          onChange={this.handleOnChange}
          value={this.state.input}
        ></input>
      </div>
    );
  }
}
