import React from 'react';
import './teamMemList.css';

export default class TeamMemberList extends React.Component {
  render() {
    return (
      this.props.members === null || this.props.members === undefined ?
        <span></span>
        : <ol>
          {Object.keys(this.props.members).map(user => {
            return (
              <li className="user">{user}</li>
            )
          })}
        </ol>
    );
  }
}