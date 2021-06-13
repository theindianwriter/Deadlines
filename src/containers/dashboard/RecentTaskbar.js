import React from "react";
import { connect } from "react-redux";
import { getRecentTasksSelector } from "../../selectors/getRecentTasksSelector";
import "./RecentTaskbar.css";
import Deletebutton from "./Deletebutton";
import Editbutton from "./Editbutton";
import CommentButton from "./CommentButton";
import firebase from "./../../config/fbConfig";

// shows all the unfinished tasks of the week in priority order
class RecentTaskbar extends React.Component {
  render() {
    const user = firebase.auth().currentUser;
    let { recentTasks } = this.props;
    let noTask = !Object.keys(recentTasks).length;
    let priorityLabel = {
      9: "High",
      5: "Medium",
      1: "Low",
    };
    return (
      <div id="bodyq">
        <h2 className="heading">
          {noTask
            ? "Enjoy!! no work in the upcoming week"
            : "your upcoming 7 days tasks are"}{" "}
        </h2>
        <div className="container">
          <div className="card-deck">
            {Object.keys(recentTasks).map((
              taskId //get all the unfinished tasks of indiviual priority
            ) => (
              <div className="card mb-3 mt-3" style={{ maxWidth: "14rem",minWidth: "14rem" }} key={taskId}>
                <div className="card-header font-weight-bold">{recentTasks[taskId].status}</div>
                <div className="card-body">
                  <h4 className="card-title">{recentTasks[taskId].name}</h4>
                  <br />
                  <h5 className="badge badge-pill badge-danger">{recentTasks[taskId].deadline}</h5>
                  <br />

                  <span className="badge badge-pill badge-warning">{priorityLabel[recentTasks[taskId].priority]}</span>
                  <br />
                </div>
                {user.uid === recentTasks[taskId].createdBy ? (
                  <div className="card-footer">
                    <Deletebutton
                      id={taskId}
                      teamId={recentTasks[taskId].teamId}
                    />
                    <Editbutton
                      id={taskId}
                      teamId={recentTasks[taskId].teamId}
                    />
                    <CommentButton
                      task={recentTasks[taskId]}
                      id={taskId}
                      teamId={recentTasks[taskId].teamId}
                    />
                  </div>
                ) : (
                  <div className="card-footer">
                    <CommentButton
                      task={recentTasks[taskId]}
                      id={taskId}
                      teamId={recentTasks[taskId].teamId}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  state.teamId = null;
  state = JSON.parse(JSON.stringify(state));
  return {
    recentTasks: getRecentTasksSelector(state), // we will get all the recent tasks of high.medium,low priority in different arrays
  };
};

export default connect(mapStateToProps, null)(RecentTaskbar);
