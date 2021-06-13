import React from "react";
import { NavLink } from "react-router-dom";
import './sidebarButton.css';

class YourTeamsButton extends React.Component {
  render() {
    return (
      <NavLink to="/teamlist">
        <button className="sidebarButton">All Your Teams</button>
      </NavLink>
    );
  }
}

export default YourTeamsButton;