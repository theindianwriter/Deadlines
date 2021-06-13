import React from "react";
import "./Body.css";
import RecentTaskbar from "./RecentTaskbar";
import RemainingTasksStatus from "./RemaningTasksStatus";
import SideBar from "./SideBar";

class Body extends React.Component {
  render() {
    return (
      <div className="wholeBody">
        <div className="body-left">
          <SideBar history={this.props.history}/>
        </div>
        <div className="body-right">
          <RemainingTasksStatus />
          <RecentTaskbar />
        </div>
      </div>
    )
  }
}


export default Body;
