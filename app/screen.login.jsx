import React from 'react';
import errorStill from './error-still.jsx';
import InputForm from './input-form.jsx';

export default class LoginScreen extends React.Component {
  render() {
    // Set the username upstream in the main chat component
    const onSubmit = user => {
      // Show an error if the login screen is still active after 2s
      errorStill('.login', 'Error signing in, please try again later');
      this.props.login(user);
    }
    return (
      <div className="login">
        <p>Join Blackstorm Chat to talk with people around the world about your favourite games and engine:</p>
        <InputForm send={onSubmit} placeholder="username" icon="perm_identity">
          Choose a username
        </InputForm>
      </div>
    );
  }
};
