import React from 'react';
import { Icon, Collection, CollectionItem } from 'react-materialize';
import ReactChatView from 'react-chatview';

export default class LoginScreen extends React.Component {
  constructor(...props){
    super(...props);
    this.state = {
      message: '',
      messages: props[0].messages
    };
  }

  componentDidMount () {
    this.props.socket.on('message', data => {
      this.setState({
        messages: [...this.state.messages, {
          user: data.user,
          type: 'message',
          message: data.message
        }]
      });
    });
    this.props.socket.on('join', data => {
      this.setState({
        messages: [...this.state.messages, {
          user: data.user,
          type: 'join'
        }]
      });
    });
  }
  render () {
    // Set the username upstream in the main chat component
    const onSubmit = e => {
      e.preventDefault();
      this.props.socket.emit('message', this.state.message);
      this.setState({ message: '' });
    }
    // Set the editing username
    const onChange = e => {
      this.setState({ message: e.target.value });
    }
    const writeMessage = (msg, i) => {
      if (msg.type === 'join') {
        return (
          <div className='msg meta' key={'msg-' + i}>
            {msg.user} joined the room #{this.props.room}
          </div>
        );
      }
      if (msg.type === 'message') {
        return (
          <div className='msg' key={'msg-' + i}>
            {msg.user}: {msg.message}
          </div>
        );
      }
      if (msg.type === 'leave') {
        return (
          <div className='msg meta' key={'msg-' + i}>
            {msg.user} left the room
          </div>
        );
      }
    };
    return (
      <ReactChatView
        className="room"
        flipped={true}
        scrollLoadThreshold={50}
        onInfiniteLoad={() => {}}
      >
        {this.state.messages.map(writeMessage)}
        <form onSubmit={onSubmit}>
          <div className="input-field">
            <input onChange={onChange} value={this.state.message} placeholder="message" autoFocus className="validate" id="username" type="text" data-length="20" />
            <label htmlFor="username">Write a message</label>
          </div>
          <button className="btn btn-large btn-floating waves-effect waves-light" type="submit" name="action">
            <i className="material-icons right">send</i>
          </button>
        </form>
      </ReactChatView>
    );
  }
};
