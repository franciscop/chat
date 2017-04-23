import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';

export default class JoinScreen extends React.Component {
  onClick (e) {
    this.props.login(e.target.getAttribute('data-room'));
  }
  render () {
    const onClick = (id, e) => {
      e.preventDefault();
      this.props.join(id);
    };
    return (
      <div className="join">
        <p>Choose a chat room to talk with others:</p>
        <Collapsible>
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
