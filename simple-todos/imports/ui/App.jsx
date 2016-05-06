import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';

// app component
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // get the text field from the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Tasks.insert({
      text,
      createdAt: new Date(),
    });
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
      ));
  }

  render() {
    return (
      <div className='container'>
        <header>
          <h1>Todo List</h1>
          <form className='new-task' onSubmit={this.handleSubmit.bind(this)} >
            <input
              type='text'
              ref='textInput'
              placeholder='Add new tasks!'
            />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

// 'createContainer wrapper is needed to use react-meteor-data'
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);

