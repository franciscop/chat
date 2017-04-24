import React from 'react';
import { Icon } from 'react-materialize';

export default class InputForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  render () {

    // Set the username upstream in the main chat component
    const onSubmit = e => {
      e.preventDefault();
      this.props.send(this.state.message);
      this.setState({ message: '' });
    }

    // Set the editing username
    const onChange = e => {
      this.setState({ message: e.target.value });
    }

    return (
      <form onSubmit={onSubmit}>
        <div className="input-field">
          {this.props.icon ? (
            <Icon className="prefix">{this.props.icon}</Icon>
          ) : ''}
          <input
            id="username"
            onChange={onChange}
            value={this.state.message}
            placeholder={this.props.placeholder}
            className="validate"
            autoComplete="off"
            type="text"
            autoFocus />
          <label htmlFor="username">{this.props.children}</label>
        </div>
        <button
          className="btn btn-large btn-floating waves-effect waves-light"
          type="submit"
          name="action">
          <i className="material-icons right">
            {this.props.iconOk || 'send'}
          </i>
        </button>
      </form>
    );
  }
}
