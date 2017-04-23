import React from 'react';

export default class LoginScreen extends React.Component {
  render() {
    // Set the username upstream in the main chat component
    const onSubmit = e => {
      e.preventDefault();
      this.props.login(this.state.name);
    }
    // Set the editing username
    const onChange = e => {
      this.setState({ name: e.target.value });
    }
    return (
      <form onSubmit={onSubmit} className="login">
        <p>Choose a username to start using the chat:</p>
        <div className="input-field">
          <i className="material-icons prefix">perm_identity</i>
          <input onChange={onChange} placeholder="write your username" autoFocus className="validate" id="username" type="text" data-length="20" />
          <label htmlFor="username">Username</label>
        </div>
        <button className="btn btn-floating btn-large waves-effect waves-light" type="submit" name="action">
          <i className="material-icons right">done</i>
        </button>
      </form>
    );
  }
};
