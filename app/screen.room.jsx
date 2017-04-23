import React from 'react';

export default class LoginScreen extends React.Component {
  render() {
    // Set the username upstream in the main chat component
    const onSubmit = e => {
      e.preventDefault();
      this.props.message(this.state.message);
      this.setState({ message: '' });
    }
    // Set the editing username
    const onChange = e => {
      this.setState({ message: e.target.value });
    }
    return (
      <div>
        <p>All messages:</p>
      </div>
    );
  }
};
