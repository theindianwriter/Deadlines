import React from "react";
import { connect } from "react-redux";
import "./ShowAllTasks.css";
import Deletebutton from "./Deletebutton";
import Editbutton from "./Editbutton";
import FilterBox from "./FilterBox";
import getFilteredTaskSelector from "../../selectors/getFilteredTaskSelector";
import CommentButton from "./CommentButton";
import firebase from "./../../config/fbConfig";

// shows the list of all the tasks based on the filtered value
class ShowAllTasks extends React.Component {
  render() {
    const user = firebase.auth().currentUser;
    const { tasks } = this.props.allTasks;
    // it maps the priority stored in the database to the priority that should be rendered in the frontend
    const priorityLabel = {
      9: "High",
      5: "Medium",
      1: "Low",
    };
    return (
      <div style={{ marginTop: "32.5px" }}>
        <FilterBox />
        <h2 className="heading">
          {Object.keys(tasks).length ? "ALL TASKS" : "NO TASK FOUND"}
        </h2>
        <div className="jumbotron">
          <div className="card-deck">
            {Object.keys(tasks).map((
              taskId //get all the unfinished tasks of indiviual priority
            ) => (
              <div
                className="card mb-3 mt-3"
                style={{ maxWidth: "14rem", minWidth: "14rem" }}
                key={taskId}
              >
                <div className="card-header font-weight-bold">
                  {tasks[taskId].status}
                </div>
                <div className="card-body">
                  <h4 className="card-title">{tasks[taskId].name}</h4>
                  <br />
                  <h5 className="badge badge-pill badge-danger">
                    {tasks[taskId].deadline}
                  </h5>
                  <br />

                  <span className="badge badge-pill badge-warning">
                    {priorityLabel[tasks[taskId].priority]}
                  </span>
                  <br />
                </div>
                {user.uid === tasks[taskId].createdBy ? (
                  <div className="card-footer">
                    <Deletebutton
                      id={taskId}
                      teamId={tasks[taskId].teamId}
                    />
                    <Editbutton
                      id={taskId}
                      teamId={tasks[taskId].teamId}
                    />
                    <CommentButton
                      task={tasks[taskId]}
                      id={taskId}
                      teamId={tasks[taskId].teamId}
                    />
                  </div>
                ) : (
                  <div className="card-footer">
                    <CommentButton
                      task={tasks[taskId]}
                      id={taskId}
                      teamId={tasks[taskId].teamId}
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
  return {
    allTasks: getFilteredTaskSelector(state), //getting the filtered tasks
  };
};

export default connect(mapStateToProps, null)(ShowAllTasks);
