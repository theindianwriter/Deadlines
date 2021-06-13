import React from "react";
import SideBar from "../dashboard/SideBar";
import RecentTeamTaskbar from "./RecentTeamTaskbar"
import EditTeamMembers from "./EditTeamMembers";

export default class Teamdashboard extends React.Component {
  render() {
    return (
      <div className="wholeBody">
        <div className="body-left">
          <SideBar history={this.props.history.location.pathname} />
        </div>
        <div className="body-right">
        <h1> Team Name : {this.props.location.state.teamName}</h1>
        <div>
          <RecentTeamTaskbar teamId={this.props.location.state.teamId} />
        </div>
        <div>
          <EditTeamMembers teamId={this.props.location.state.teamId}/>
        </div>
        </div>
      </div>
    );
  }
}
