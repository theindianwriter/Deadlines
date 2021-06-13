import React from "react";
import getRemainingTasksStatus from "../../selectors/remainingTasksStatusSelector";
import { connect } from "react-redux";
import "./RemainingTasksStatus.css";

//show the no. of unfinished tasks today,tommorrow,this week

export class RemainingTasksStatus extends React.Component {
  render() {
    let {
      tasksToday,
      tasksTommorrow,
      tasksInweek,
    } = this.props.remainingTasksDetails;
    return (
      <div className="container tasks-container">
        <div className="row wow fadeIn">
          <div className="col-md-4 ">
            <div className="card">
              <div className="card-body">
                  <h4 className="card-title">Remaining tasks today:</h4>
                  <p className="card-text">{tasksToday}</p>
              
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="card">
              <div className="card-body">
                
                  <h4 className="card-title">Remaining tasks tomorrow:</h4>
                  <p className="card-text">{tasksTommorrow}</p>
                
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                
                  <h4 className="card-title">Remaining tasks this week:</h4>
                  <p className="card-text">{tasksInweek}</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    remainingTasksDetails: getRemainingTasksStatus(state), // i get the user remaining tasks stats
  };
};

export default connect(mapStateToProps, null)(RemainingTasksStatus);
