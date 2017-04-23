import React from 'react';
import LoginScreen from './screen.login.jsx';
import JoinScreen from './screen.join.jsx';
import RoomScreen from './screen.room.jsx';
import { Button, Icon } from 'react-materialize';
import io from 'socket.io-client';
import cookies from 'cookiesjs';
import rooms from './rooms.js';

const LogoutButton = props => (
  <Button
    onClick={props.action}
    floating
    className="red"
    icon='power_settings_new'
    title='Logout'
  />
);

export default class Chat extends React.Component {
  constructor(...props){
    super(...props);
    this.state = {
      user: cookies('user'),
      socket: io(),
      room: false,
      messages: []
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('login', user => {
      cookies({ user });
      this.setState({ user });
    });
    socket.on('rooms', rooms => {
      this.setState({ rooms });
    });
    socket.on('join', data => {
      console.log('JOINED!', data);
      this.setState({
        room: data.room,
        messages: this.state.messages.concat({ type: 'join', user: data.user })
      });
    });
  }

  getScreen({ user = false, room = false }) {
    // if (room && !user) {
    //   return <ErrorScreen />;
    // }
    if (room) {
      return <RoomScreen messages={[]} />;
    }
    if (user) {
      return <JoinScreen join={room => this.props.socket.emit('join', room)} rooms={rooms} />;
    }
    return <LoginScreen login={user => this.props.socket.emit('login', user)} />;
  }

  render() {
    const leave = () => {
      this.setState({ room: false });
    };
    const logout = () => {
      cookies({ user: undefined });
      this.setState({ user: false, room: false });
    };
    return (
      <div>
        <h1>
          Blackstorm Chat
          <span className="actions">
            {this.state.room ? (
              <Button floating onClick={leave} icon='view_list' title='Back to list'></Button>
            ) : ''}
            {this.state.user ? (
              <LogoutButton action={logout} />
            ) : ''}
          </span>
        </h1>
        {this.getScreen({ user: this.state.user, room: this.state.room })}
      </div>
    );
  }
}
