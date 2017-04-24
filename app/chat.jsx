import React from 'react';
import LoginScreen from './screen.login.jsx';
import JoinScreen from './screen.join.jsx';
import RoomScreen from './screen.room.jsx';
import { Button, Icon } from 'react-materialize';
import io from 'socket.io-client';
import cookies from 'cookiesjs';


export default class Chat extends React.Component {
  constructor(props){
    super(props);
    const user = cookies('user');
    const room = window.location.hash.replace(/^#/, '') || false;
    this.state = {
      user: user,
      socket: io(),
      room: room,
      messages: [],
      rooms: []
    };
    if (user) {
      this.state.socket.emit('login', user);
    }
    if (room) {
      this.state.socket.emit('join', room);
    }
  }

  componentDidMount() {
    window.addEventListener('popstate', e => {
      this.setState({
        room: window.location.hash.replace(/^#/, ''),
        messages: []
      });
    });
    $(".button-collapse").sideNav();
    const { socket } = this.state;
    socket.on('login', ({ user, rooms }) => {
      cookies({ user });
      this.setState({ user, rooms });
    });
    socket.on('rooms', data => {
      console.log(data.rooms);
      this.setState({ rooms: data.rooms });
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
      return <RoomScreen room={room} socket={this.state.socket} messages={this.state.messages} />;
    }
    if (user) {
      return <JoinScreen join={room => this.state.socket.emit('join', room)} rooms={this.state.rooms || []} />;
    }
    return <LoginScreen login={user => this.state.socket.emit('login', user)} />;
  }

  render() {
    const leave = () => {
      // Remove hash ( http://stackoverflow.com/a/5298684/938236 )
      this.setState({ room: false, messages: [] });
      this.state.socket.emit('leave');
      history.pushState("", document.title, window.location.pathname + window.location.search);
    };
    const logout = () => {
      leave();
      cookies({ user: undefined });
      this.setState({ user: false, room: false, messages: [] });
    };
    return (
      <div>
        <nav>
          <a href="/" className="brand-logo">
            <Icon>question_answer</Icon>
            Blackstorm <span className="no-mobile">Chat</span>
          </a>
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
          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <Icon>menu</Icon>
          </a>
          <ul className="side-nav" id="mobile-demo">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">Javascript</a></li>
            <li><a href="mobile.html">Mobile</a></li>
          </ul>
        </nav>
        <main>
          {this.getScreen({ user: this.state.user, room: this.state.room })}
        </main>
      </div>
    );
  }
}
