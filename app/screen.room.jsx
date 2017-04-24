import React from 'react';
import { Icon, Collection, CollectionItem } from 'react-materialize';
import ReactChatView from 'react-chatview';
import InputForm from './input-form.jsx';

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
      console.log('Data:', data);
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
    const onSubmit = message => {
      this.props.socket.emit('message', message);
    }

    const writeMessage = (msg, i) => {

      // If it's a grayed-out message or not
      const meta = ['join', 'leave'].includes(msg.type);
      const types = {
        join: msg => `${msg.user} joined the room #${this.props.room}`,
        message: msg => `${msg.user}: ${msg.message}`,
        leave: msg => `${msg.user} left the room #${this.props.room}`,
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
