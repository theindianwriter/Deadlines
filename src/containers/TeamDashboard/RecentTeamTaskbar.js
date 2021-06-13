import React from "react";
import { connect } from "react-redux";
import { getRecentTeamTasksSelector } from "../../selectors/getRecentTasksSelector";
import "./RecentTeamTaskbar.css";
import Deletebutton from "./../dashboard/Deletebutton";
import Editbutton from "./../dashboard/Editbutton";
import CommentButton from "./../dashboard/CommentButton";
import firebase from "./../../config/fbConfig";

// shows all the unfinished tasks of the week in priority order
class RecentTaskbar extends React.Component {
  render() {
    const user = firebase.auth().currentUser;
    let { recentTasks } = this.props;
    let noTask = !Object.keys(recentTasks).length;
    let priorityLabel = {
      9: "high",
      5: "medium",
      1: "low"
    };
    return (
      <div id="bodyq">
        <h2 className="heading">
          {noTask
            ? "Enjoy!! no work in the upcoming week"
            : "your upcoming 7 days tasks are"}{" "}
        </h2>
        <div>
          {Object.keys(recentTasks).map((
            taskId //get all the unfinished tasks of indiviual priority
          ) => (
              <div
                className={priorityLabel[recentTasks[taskId].priority]}
                key={taskId}
              >
                <span>{recentTasks[taskId].name}</span>
                <br />
                <span>{recentTasks[taskId].deadline}</span>
                <br />
                <span>{priorityLabel[recentTasks[taskId].priority]}</span>
                <br />
                <span>{recentTasks[taskId].status}</span>
                <br />
                {
                  user.uid === recentTasks[taskId].createdBy ?
                    <div>
                      <Deletebutton id={taskId} teamId={recentTasks[taskId].teamId} />
                      <Editbutton id={taskId} teamId={recentTasks[taskId].teamId} />
                    </div> : null
                }
                <CommentButton task={recentTasks[taskId]} id={taskId} teamId={recentTasks[taskId].teamId}/>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let teamId = ownProps.teamId;
  return {
    recentTasks: getRecentTeamTasksSelector(state,teamId) // we will get all the recent tasks of high.medium,low priority in different arrays
  };
};

export default connect(
  mapStateToProps,
  null
)(RecentTaskbar);
