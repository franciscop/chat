import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import errorStill from './error-still.jsx';

export default class JoinScreen extends React.Component {
  onClick (e) {
    this.props.login(e.target.getAttribute('data-room'));
  }
  componentDidMount () {
    $('.join a').addClass('waves-effect waves-teal');
  }
  render () {
    const onClick = (id, e) => {
      e.preventDefault();

      // Show an error if the join screen is still active after 2000ms
      errorStill('.join', 'Error loading the room, please try again later');
      this.props.join(id);
    };
    return (
      <div className="join">
        <p>Pick a chat room:</p>
        <Collapsible accordion={true} defaultActiveKey={false}>
          {this.props.rooms.map((room, i) => (
            <CollapsibleItem
              key={'room-' + room.id}
              onClick={onClick.bind(this, room.id)}
              header={room.name}
              icon={room.icon}
            />
          ))}
        </Collapsible>
      </div>
    );
  }
};
