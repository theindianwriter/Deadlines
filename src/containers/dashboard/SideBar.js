import React from "react";
import CreateTaskButton from "./CreateTaskButton";
import AllTaskButton from "./AllTaskButton";
import "./SideBar.css";
import NewTeamButton from "./CreateTeamButton";
import YourTeamsButton from "./YourTeamsButton";

class SideBar extends React.Component {
  render() {
    return (
      <div id="sidebar">
        <hr style={{marginTop:"0px"}}/>
        <CreateTaskButton history={this.props.history}/>
        <hr />
        <AllTaskButton history={this.props.history}/>
        <hr />
        <NewTeamButton history={this.props.history}/>
        <hr />
        <YourTeamsButton history={this.props.history}/>
        <hr />
      </div>
    );
  }
}

export default SideBar;
