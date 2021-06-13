import React from "react";
import { connect } from "react-redux";

// filters all the tasks based on type,priority and status
export class FilterBox extends React.Component {
  handleOnChange = (event) => {
    const { type } = event.target.dataset;
    this.props.onChange(event.target.value, event.target.checked, type);
  };

  render() {
    const {
      statusCheckbox,
      typeCheckbox,
      priorityCheckbox,
      deadlinePassedCheckbox,
    } = this.props.checkboxStatus;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <h1>Filters</h1>
          </div>
          <div className="col-md-3">
        
          <button className="btn btn-danger" onClick={this.props.resetAll}>Reset All</button>
    
        </div>
        </div>

        <div className="row">
          <div className="col-md-3">
          <span>
            <input
              type="checkbox"
              className="form-check-input"
              value="deadlinePassedSelected"
              data-type="deadline-passed"
              onChange={this.handleOnChange}
              checked={deadlinePassedCheckbox.includes(
                "deadlinePassedSelected"
              )}
            />
            Deadline-passed
            <br />
          </span>
          </div>
          <div className="col-md-3">
          <span>
            <input
              type="checkbox"
              className="form-check-input"
              value="Not-started"
              data-type="taskStatus"
              onChange={this.handleOnChange}
              checked={statusCheckbox.includes("Not-started")}
            />
            Not-Started Task
            <br />
          </span>

          <span>
            <input
              type="checkbox"
              className="form-check-input"
              value="In-progress"
              data-type="taskStatus"
              onChange={this.handleOnChange}
              checked={statusCheckbox.includes("In-progress")}
            />
            In-progress Task
            <br />
          </span>
         

          <span>
            <input
              type="checkbox"
              className="form-check-input"
              value="Completed"
              data-type="taskStatus"
              onChange={this.handleOnChange}
              checked={statusCheckbox.includes("Completed")}
            />
            Completed Task
            <br />
          </span>
          </div>
          <div className="col-md-3">
          <span>
            <input
              type="checkbox"
              className="form-check-input"
              value="solo"
              data-type="taskType"
              onChange={this.handleOnChange}
              checked={typeCheckbox.includes("solo")}
            />
            Personal Task
            <br />
          </span>
          <span>
            <input
              type="checkbox"
              className="form-check-input"
              value="team"
              data-type="taskType"
              onChange={this.handleOnChange}
              checked={typeCheckbox.includes("team")}
            />
            Team Task
            <br />
          </span>
          </div>
          <div className="col-md-3">
          <span>
            <input
              type="checkbox"
              className="form-check-input"
              value={9}
              data-type="taskPriority"
              onChange={this.handleOnChange}
              checked={priorityCheckbox.includes("9")}
            />
            High
            <br />
          </span>
          <span>
            <input
              type="checkbox"
              className="form-check-input"
              value={5}
              data-type="taskPriority"
              onChange={this.handleOnChange}
              checked={priorityCheckbox.includes("5")}
            />
            Medium
            <br />
          </span>
          <span>
            <input
              type="checkbox"
              className="form-check-input"
              value={1}
              data-type="taskPriority"
              onChange={this.handleOnChange}
              checked={priorityCheckbox.includes("1")}
            />
            Low
            <br />
          </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkboxStatus: state.checkboxStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (value, status, criteria) => {
      dispatch({
        type: "CHECKBOX_STATUS_CHANGED",
        value: value,
        status: status,
        criteria: criteria,
      });
    },
    resetAll: () => {
      dispatch({
        type: "CLEAR_ALL_CHECKBOX",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);
