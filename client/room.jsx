import React from 'react';
import { Icon, Collection, CollectionItem } from 'react-materialize';
import ReactChatView from 'react-chatview';
import InputForm from './input-form.jsx';

export default class Room extends React.Component {
  constructor(...props){
    super(...props);
    this.state = {
      message: '',
      messages: []
    };
  }

  componentDidMount () {
    this.props.socket.on('message', data => {
      this.setState({
        messages: [...this.state.messages, {
          user: data.user,
          type: 'message',
          message: data.message,
          total: data.total
        }]
      });
    });
    this.props.socket.on('join', data => {
      this.setState({
        messages: [...this.state.messages, {
          user: data.user,
          type: 'join',
          total: data.total
        }]
      });
    });
    this.props.socket.on('leave', data => {
      console.log(data);
      if (data.user === this.props.user) {
        return;
      }
      this.setState({
        messages: [...this.state.messages, {
          user: data.user,
          type: 'leave',
          total: data.total
        }]
      });
    });
  }
  componentWillUnmount () {
    this.props.socket.removeAllListeners('join');
    this.props.socket.removeAllListeners('message');
    this.props.socket.removeAllListeners('leave');
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
        join: msg => `${msg.user} joined #${this.props.room} - ${msg.total} users`,
        message: msg => `${msg.user}: ${msg.message}`,
        leave: msg => `${msg.user} left #${this.props.room} - ${msg.total} users`,
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

        <InputForm send={onSubmit} icon="edit_mode">
          Write a message
        </InputForm>
      </ReactChatView>
    );
  }
};
