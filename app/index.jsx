import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import cookies from 'cookiesjs';

import Chat from './chat.jsx';

render((
  <Chat
    user={cookies('user')}
    setUser={user => cookies({ user: user })}
    socket={io()}
  />
), document.querySelector('main'));
