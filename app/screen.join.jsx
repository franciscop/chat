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
      window.location.hash = id;

      // Show an error if the join screen is still active after 2000ms
      errorStill('.join.screen', 'Error loading the room, please try again later');
      this.props.join(id);
    };
    return (
      <div className="join screen">
        <p>Pick a chat room:</p>
        <Collapsible accordion={true} defaultActiveKey={false}>
          {this.props.rooms.map(room => (
            <CollapsibleItem
              key={'room-' + room.name.toLowerCase()}
              href={'#' + room.name.toLowerCase()}
              onClick={onClick.bind(this, room.name.toLowerCase())}
              header={room.name + ' - ' + room.users}
              icon={room.icon}
            >
              <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
            </CollapsibleItem>
          ))}
        </Collapsible>
      </div>
    );
  }
};
