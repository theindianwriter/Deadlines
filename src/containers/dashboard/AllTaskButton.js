import React from "react";
import { NavLink } from "react-router-dom";
import './sidebarButton.css';

class ShowAllTasksButton extends React.Component {
  render() {
    return (
      <NavLink to="/showalltasks">
        <button className="sidebarButton"> All Your Tasks </button>
      </NavLink>
    );
  }
}

export default ShowAllTasksButton;
