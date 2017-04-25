import React from 'react';
import { Icon } from 'react-materialize';

export default class InputForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = { message: '' };
  }

  render () {

    // Send the input value upstream and reset the input field
    const onSubmit = e => {
      e.preventDefault();
      this.props.send(this.state.message);
      this.setState({ message: '' });
    }

    // Edit-as-you-go for the input field
    const onChange = e => this.setState({ message: e.target.value });

    // Make sure that clicking around the input focuses it
    // It will submit if click on the button, then re-focus it
    const onClick = e => e.currentTarget.querySelector('input').focus();

    // For this context this randomized is totally okay
    const field = 'field-' + parseInt(Math.random() * 100000);

    return (
      <form onSubmit={onSubmit} onClick={onClick}>
        <div className="input-field">
          {this.props.icon ? (
            <Icon className="prefix">{this.props.icon}</Icon>
          ) : ''}
          <input
            id={field}
            onChange={onChange}
            value={this.state.message}
            placeholder={this.props.placeholder}
            className="validate"
            autoComplete="off"
            type="text"
            autoFocus />
          <label htmlFor={field}>{this.props.children}</label>
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
