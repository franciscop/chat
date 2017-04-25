import React from 'react';
import LoginScreen from './screen.login.jsx';
import JoinScreen from './screen.join.jsx';
import Room from './room.jsx';
import { Button, Icon } from 'react-materialize';
import io from 'socket.io-client';
import cookies from 'cookiesjs';

export default class Chat extends React.Component {
  constructor(props){
    super(props);
    const user = cookies('user');
    const room = window.location.hash.replace(/^#/, '') || false;
    this.state = { user: user, socket: io(), room: room, rooms: [] };
    if (user) {
      this.state.socket.emit('login', user);
    }
    if (room) {
      this.state.socket.emit('join', room);
    }
    this.leave = this.leave.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    window.addEventListener('popstate', e => {
      const room = window.location.hash.replace(/^#/, '');
      if (!room) {
        this.state.socket.emit('leave');
      }
      this.setState({ room });
    });
    $(".button-collapse").sideNav();
    const { socket } = this.state;
    socket.on('login', ({ user, rooms }) => {
      cookies({ user });
      this.setState({ user, rooms });
    });
    socket.on('rooms', data => {
      this.setState({ rooms: data.rooms });
    });
    socket.on('join', data => {
      this.setState({ room: data.room });
    });
  }

  getScreen({ user = false, room = false }) {
    if (room && !user) {
      Materialize.toast('Error detected, please log in again', 3000);
      this.setState({  });
      return <p>Error detected, please log in again</p>;
    }
    if (room) {
      return (
        <Room
          user={user}
          room={room}
          socket={this.state.socket}
        />
      );
    }
    if (user) {
      return (
        <JoinScreen
          join={room => this.state.socket.emit('join', room)}
          rooms={this.state.rooms || []}
        />
      );
    }
    return (
      <LoginScreen
        login={user => this.state.socket.emit('login', user)}
      />
    );
  }


  logout () {
    this.leave();
    cookies({ user: undefined });
    this.setState({ user: false, room: false });
  };

  leave () {
    // Remove hash ( http://stackoverflow.com/a/5298684/938236 )
    this.setState({ room: false });
    this.state.socket.emit('leave');
    history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  render() {
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
                <a className="waves-effect waves-light" onClick={this.leave} title='Back to list'>
                  <i className="material-icons left">list</i>
                  Back to list
                </a>
              </li>
            ) : ''}
            {this.state.user ? (
              <li>
                <a className="waves-effect waves-light" onClick={this.logout} title='Log out'>
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
            {this.state.room ? (
              <li>
                <a className="waves-effect waves-light" onClick={this.leave} title='Back to list'>
                  <i className="material-icons left">list</i>
                  Back to list
                </a>
              </li>
            ) : ''}
            {this.state.user ? (
              <li>
                <a className="waves-effect waves-light" onClick={this.logout} title='Log out'>
                  <i className="material-icons left">power_settings_new</i>
                  Logout
                </a>
              </li>
            ) : ''}
          </ul>
        </nav>
        <main>
          {this.getScreen({ user: this.state.user, room: this.state.room })}
          <p>Note: this is a demo for an interview.</p>
        </main>
      </div>
    );
  }
}
