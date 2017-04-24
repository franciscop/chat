import React from 'react';
import LoginScreen from './screen.login.jsx';
import JoinScreen from './screen.join.jsx';
import RoomScreen from './screen.room.jsx';
import { Button, Icon } from 'react-materialize';
import io from 'socket.io-client';
import cookies from 'cookiesjs';
import rooms from './rooms.js';


export default class Chat extends React.Component {
  constructor(...props){
    super(...props);
    const user = cookies('user');
    if (user) {
      this.props.socket.emit('login', cookies('user'));
    }
    this.state = {
      user: user,
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
      return <RoomScreen room={room} socket={this.props.socket} messages={this.state.messages} />;
    }
    if (user) {
      return <JoinScreen join={room => this.props.socket.emit('join', room)} rooms={rooms} />;
    }
    return <LoginScreen login={user => this.props.socket.emit('login', user)} />;
  }

  render() {
    const leave = () => {
      this.setState({ room: false, messages: [] });
    };
    const logout = () => {
      cookies({ user: undefined });
      this.setState({ user: false, room: false, messages: [] });
    };
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">Blackstorm Chat</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.state.room ? (
                <li>
                  <a className="waves-effect waves-light" onClick={leave} title='Back to list'>
                    <i className="material-icons left">list</i>
                    Back to list
                  </a>
                </li>
              ) : ''}
              {this.state.user ? (
                <li>
                  <a className="waves-effect waves-light" onClick={logout} title='Log out'>
                    <i className="material-icons left">power_settings_new</i>
                    Logout
                  </a>
                </li>
              ) : ''}
            </ul>
          </div>
        </nav>
        <main>
          {this.getScreen({ user: this.state.user, room: this.state.room })}
        </main>
      </div>
    );
  }
}
