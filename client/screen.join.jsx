import React from 'react';
import { Icon } from 'react-materialize';
import errorStill from './error-still.jsx';
import Loading from './loading.jsx';

const join = (join, id) => {
  window.location.hash = id;

  // Show an error if the join screen is still active after 2000ms
  errorStill('.join.screen', 'Error loading the room, please try again later');
  join(id);
};

const RoomList = props => (
  <ul className="collapsible" data-collapsible="accordion">
    {props.rooms.map(room => (
      <li key={'room-' + room.name.toLowerCase()}>
        <a
          onClick={join.bind(null, props.join, room.name.toLowerCase())}
          href={'#' + room.name.toLowerCase()}
          className="collapsible-header">
          <Icon>{room.icon}</Icon>
          {room.name}
          <span className="secondary-content">
            {room.users}
            <Icon right>supervisor_account</Icon>
          </span>
        </a>
      </li>
    ))}
  </ul>
);


export default props => (
  <div className="join screen">
    {props.rooms.length ? (
      <div>
        <p>Pick a chat room:</p>
        <RoomList rooms={props.rooms} join={props.join} />
      </div>
    ) : (
      <Loading />
    )}
  </div>
);
