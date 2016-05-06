import React, { Component, PropTypes } from 'react';

// One todo item
export default class Task extends Component {
  render() {
    return (
      <li>{ this.props.task.text}</li>
      );
  }
}

Task.propTypes = {
  //displays task through a React prop
  task: PropTypes.object.isRequired,
};
