import React from 'react';
import errorStill from './error-still.jsx';

export default class LoginScreen extends React.Component {
  render() {
    // Set the username upstream in the main chat component
    const onSubmit = e => {
      e.preventDefault();
      // Show an error if the login screen is still active after 2s
      errorStill('.login', 'Error signing in, please try again later');
      this.props.login(this.state.name);
    }
    // Set the editing username
    const onChange = e => {
      this.setState({ name: e.target.value });
    }
    return (
      <form onSubmit={onSubmit} className="login">
        <p>Join Blackstorm Chat to talk with people around the world about your favourite games and engine:</p>
        <div className="input-field">
          <i className="material-icons prefix">perm_identity</i>
          <input onChange={onChange} placeholder="username" autoFocus className="validate" id="username" type="text" data-length="20" />
          <label htmlFor="username">Choose a username</label>
        </div>
        <button className="btn btn-floating waves-effect waves-light" type="submit" name="action">
          <i className="material-icons right">done</i>
        </button>
      </form>
    );
  }
};
