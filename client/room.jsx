import React from 'react';
import { Icon, Collection, CollectionItem } from 'react-materialize';
import ReactChatView from 'react-chatview';
import InputForm from './input-form.jsx';

// Encapsulate the message into a single entity
const listen = (socket, type, callback) => {
  socket.on(type, data => callback(Object.assign({}, data, { type })));
};

export default class Room extends React.Component {
  constructor(props){
    super(props);
    this.state = { messages: [] };

    listen(this.props.socket, 'message', message => {
      this.setState({ messages: [...this.state.messages, message] });
    });

    listen(this.props.socket, 'join', message => {
      this.setState({ messages: [...this.state.messages, message] });
    });

    listen(this.props.socket, 'leave', message => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  componentWillUnmount () {
    this.props.socket.removeAllListeners('join');
    this.props.socket.removeAllListeners('message');
    // this.props.socket.removeAllListeners('leave');
  }
  render () {
    // Set the username upstream in the main chat component
    const onSubmit = message => {
      this.props.socket.emit('message', message);
    }

    const writeMessage = (msg, i) => {

      // If it's a grayed-out message or not
      const meta = ['join', 'leave'].includes(msg.type);
      const types = {
        join: msg => (
          <div>
            {msg.user} joined #{msg.room}
            <span className="secondary-content">{msg.total}
              <i className="material-icons right">supervisor_account</i>
            </span>
          </div>
        ),
        message: msg => <div>{msg.user}: {msg.message}</div>,
        leave: msg => (
          <div>
            {msg.user} left #{msg.room}
            <span className="secondary-content">{msg.total}
              <i className="material-icons right">supervisor_account</i>
            </span>
          </div>
        )
      };

      return (
        <div className={['msg', meta ? 'meta' : ''].join(' ')} key={'msg-' + i}>
          {types[msg.type](msg)}
        </div>
      );
    };
    return (
      <ReactChatView
        className="room"
        flipped={true}
        scrollLoadThreshold={50}
        onInfiniteLoad={() => {}}
      >
        {this.state.messages.map(writeMessage)}

        <InputForm placeholder="message" send={onSubmit} icon="edit_mode">
          Write a message
        </InputForm>
      </ReactChatView>
    );
  }
};
