import React from "react";
import "../LoginForm.css";
import { bindActionCreators } from "redux";
import firebase from "../../config/fbConfig";
import { connect } from "react-redux";
import toaster from "toasted-notes";
import { getTime } from "./../../helpers/helpers";
import Select from "react-select-virtualized";
//Creates new task form as well as edits existing taskform
export class CreateTaskForm extends React.Component {
  state = this.props.initialState;
  //To save normal feild values
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  //To save values from "Select" component
  addToState = (selectedOption, bool) => {
    if (bool) {
      //Here bool is just used an distinguisher between value from Selected Team or Selected User
      let tempUsers = []; //To locally store the members of a certain team
      if (selectedOption !== null) {
        const { teamMembers } = this.props.teams.data[selectedOption.value];
        Object.keys(teamMembers).forEach(id => {
          let a = {
            value: teamMembers[id].userId,
            label: teamMembers[id].username
          };
          tempUsers.push(a);
        });
      }
      this.setState({
        teamId: selectedOption !== null ? [selectedOption] : null,
        assignedTo: null,
        allUsers: tempUsers
      });
    } else {
      this.setState({
        assignedTo: selectedOption !== null ? [selectedOption] : null
      });
    }
  };
  //To store Teams of which user is a member in the form of array-of-objects
  componentWillMount() {
    let tempTeams = [];
    Object.keys(this.props.teams.data).forEach(team => {
      let a = {
        value: team,
        label: this.props.teams.data[team].teamName
      };
      tempTeams.push(a);
    });
    this.setState({ allTeams: tempTeams, allUsers: this.props.allUsers });
  }
  //To save values in database
  saveAllValues = event => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    if (!(this.state.name && this.state.deadline)) {
      toaster.notify("Please fill up all the input fields", {
        position: "bottom"
      });
      return;
    }
    if (this.props.id === undefined) {
      //To check if an id has been sent or not, basically whether it's a new task or edited one
      let date1 = new Date("01-01-2000");
      let date2 = new Date(this.state.deadline);
      let Difference_In_Time = date2.getTime() - date1.getTime();
      let taskDetails = {
        completedOn: "",
        createdOn: getTime(new Date()),
        deadline: this.state.deadline,
        description: this.state.description,
        name: this.state.name,
        priority: this.state.priority,
        startedOn: "",
        status: this.state.status,
        createdBy: user.uid,
        assignedTo:
          this.state.type === "solo"
            ? user.uid
            : this.state.assignedTo === null
              ? user.uid
              : this.state.assignedTo[0].value,
        assignedName:
          this.state.type === "solo"
            ? this.props.userDetails.data.name
            : this.state.assignedTo === null
              ? this.props.userDetails.data.name
              : this.state.assignedTo[0].label,
        index: Difference_In_Time,
        teamId: this.state.type === "team" ? this.state.teamId[0].value : null,
        teamName:
          this.state.type === "team" ? this.state.teamId[0].label : null,
        type: this.state.type
      };
      let db = firebase.firestore();
      db.collection("task")
        .add(taskDetails)
        .then(docRef => {
          toaster.notify("Successfully saved");
          this.props.closePopUp();
          if (this.state.type === "team") {
            db.collection("teams")
              .doc(this.state.teamId[0].value)
              .collection("teamTask")
              .doc(docRef.id)
              .set({
                taskId: docRef.id,
                index: Difference_In_Time,
                priority: this.state.priority
              });
            this.state.allUsers.forEach(teamMembers => {
              db.collection("users")
                .doc(teamMembers.value)
                .collection("notifications")
                .doc()
                .set({
                  title: `A NEW TASK WAS CREATED FOR TEAM ${this.state.teamId[0].label}`,
                  body: `Task name ${this.state.name} was created and assigned to ${this.state.assignedTo[0].label}`,
                  createdOn: getTime(new Date()),
                  index: Date.now()
                });
            });
          }
        })
        .catch(error => {
          toaster.notify(<div>{error.message}</div>);
        });
    } else {
      //Means it is an edited task
      let db = firebase.firestore();
      let date1 = new Date("01-01-2000");
      let date2 = new Date(this.state.deadline);
      let Difference_In_Time = date2.getTime() - date1.getTime();
      let updatedTaskDetails = {
        completedOn: this.state.completedOn,
        createdOn: this.state.createdOn,
        deadline: this.state.deadline,
        description: this.state.description,
        name: this.state.name,
        priority: this.state.priority,
        startedOn: this.state.startedOn,
        status: this.state.status,
        createdBy: this.state.createdBy,
        assignedTo:
          this.state.type === "solo"
            ? user.uid
            : this.state.assignedTo === null
              ? user.uid
              : this.state.assignedTo[0].value,
        assignedName:
          this.state.type === "solo"
            ? this.props.userDetails.data.name
            : this.state.assignedTo === null
              ? this.props.userDetails.data.name
              : this.state.assignedTo[0].label,
        index: Difference_In_Time,
        teamId: this.state.type === "team" ? this.state.teamId[0].value : null,
        teamName:
          this.state.type === "team" ? this.state.teamId[0].label : null,
        type: this.state.type
      };
      if (
        this.props.initialState.type === "team" &&
        this.props.initialState.teamId[0].value !== updatedTaskDetails.teamId
      ) {
        db.collection("teams")
          .doc(this.props.initialState.teamId[0].value)
          .collection("teamTask")
          .doc(this.props.id)
          .delete() //First of all delete the task details from the "teamTask", a sub-collection of "teams" to avoid any redundancy
          .then(
            //Then save the updated details
            db
              .collection("task")
              .doc(this.props.id)
              .update(updatedTaskDetails)
              .then(() => {
                toaster.notify("Successfully edited");
                this.props.closePopUp();
                if (this.state.type === "team") {
                  db.collection("teams")
                    .doc(this.state.teamId[0].value)
                    .collection("teamTask")
                    .doc(this.props.id)
                    .set({
                      taskId: this.props.id,
                      index: Difference_In_Time,
                      priority: this.state.priority
                    });
                }
              })
              .catch(error => {
                toaster.notify(<div>{error.message}</div>);
              })
          )
          .catch(error => {
            toaster.notify(<div>{error.message}</div>);
          });
      } else {
        //Normal details updation
        db.collection("task")
          .doc(this.props.id)
          .update(updatedTaskDetails)
          .then(() => {
            toaster.notify("Successfully edited");
            this.props.closePopUp();
            if (this.state.type === "team") {
              db.collection("teams")
                .doc(this.state.teamId[0].value)
                .collection("teamTask")
                .doc(this.props.id)
                .set({
                  taskId: this.props.id,
                  index: Difference_In_Time,
                  priority: this.state.priority
                });
            }
          })
          .catch(error => {
            toaster.notify(<div>{error.message}</div>);
          });
      }
    }
  };

  render() {
    return (
      <div className="formMain">
        <button id="cross" onClick={() => this.props.closePopUp()}>
          X
          </button>
        <form>
          <h2 className="formHeading">
            {this.props.id === undefined ? "New Task Form" : "Edit task"}
          </h2>
          <ul className="flex-outer">
            <li>
              <label>Name :</label>
              <input
                type="text"
                name="name"
                placeholder="Enter the name of task"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </li>
            <li>
              <label>Deadline :</label>
              <input
                type="date"
                name="deadline"
                placeholder="Enter your deadline"
                onChange={this.handleChange}
                value={this.state.deadline}
              />
            </li>
            <li>
              <label>Description :</label>
              <textarea
                rows="6"
                name="description"
                placeholder="Enter task's description"
                onChange={this.handleChange}
                value={this.state.description}
              />
            </li>
            <li>
              <p>Priority :</p>
              <ul className="flex-inner">
                <li>
                  <input
                    name="priority"
                    type="radio"
                    value={9}
                    onChange={this.handleChange}
                    checked={this.state.priority === "9"}
                  />
                  <label>High</label>
                </li>
                <li>
                  <input
                    name="priority"
                    type="radio"
                    value={5}
                    onChange={this.handleChange}
                    checked={this.state.priority === "5"}
                  />
                  <label>Medium</label>
                </li>
                <li>
                  <input
                    name="priority"
                    type="radio"
                    value={1}
                    onChange={this.handleChange}
                    checked={this.state.priority === "1"}
                  />
                  <label>Low</label>
                </li>
              </ul>
            </li>
            <li>
              <p>Status :</p>
              <ul className="flex-inner">
                <li>
                  <input
                    name="status"
                    type="radio"
                    value="Not-started"
                    onChange={this.handleChange}
                    checked={this.state.status === "Not-started"}
                  />
                  <label>Not-started</label>
                </li>
                <li>
                  <input
                    name="status"
                    type="radio"
                    value="In-progress"
                    onChange={this.handleChange}
                    checked={this.state.status === "In-progress"}
                  />
                  <label>In-progress</label>
                </li>
                {this.props.id !== undefined ? (
                  <li>
                    <input
                      name="status"
                      type="radio"
                      value="Completed"
                      onChange={this.handleChange}
                      checked={this.state.status === "Completed"}
                    />
                    <label>Completed</label>
                  </li>
                ) : (
                    <li></li>
                  )}
              </ul>
            </li>
            <li>
              <p>Type :</p>
              <ul className="flex-inner">
                <li>
                  <input
                    name="type"
                    type="radio"
                    value="solo"
                    onChange={this.handleChange}
                    checked={this.state.type === "solo"}
                  />
                  <label>Solo</label>
                </li>
                <li>
                  <input
                    name="type"
                    type="radio"
                    value="team"
                    onChange={this.handleChange}
                    checked={this.state.type === "team"}
                  />
                  <label>Team</label>
                </li>
              </ul>
            </li>
            {this.state.type === "team" ? (
              <li>
                <label>Team Name :</label>
                <Select
                  value={this.state.teamId}
                  options={this.state.allTeams}
                  onChange={option => this.addToState(option, true)}
                />
              </li>
            ) : (
                <div></div>
              )}
            {this.state.teamId !== null && this.state.type === "team" ? (
              <li>
                <label>Assigned to :</label>
                <Select
                  value={this.state.assignedTo}
                  options={this.state.allUsers}
                  onChange={option => this.addToState(option, false)}
                />
              </li>
            ) : (
                <div></div>
              )}
            <li>
              <button type="submit" onClick={this.saveAllValues}>
                Save
                </button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

// if an id has been sent then the initial state is the details of that id otherwise the default state

const mapStateToProps = (state, ownProps) => {
  if (ownProps.id !== undefined) {
    let tempUsers = [];
    let initialState = {};
    if (ownProps.teamId !== null) {
      let teamId = ownProps.teamId;
      const { teamMembers } = state.teams.data[teamId];
      Object.keys(teamMembers).forEach(id => {
        let a = {
          value: teamMembers[id].userId,
          label: teamMembers[id].username
        };
        tempUsers.push(a);
      });
      initialState = {
        ...state.teamTasks.data[teamId][ownProps.id],
        teamId: [
          {
            value: teamId,
            label: state.teamTasks.data[teamId][ownProps.id].teamName
          }
        ],
        assignedTo: [
          {
            value: state.teamTasks.data[teamId][ownProps.id].assignedTo,
            label: state.teamTasks.data[teamId][ownProps.id].assignedName
          }
        ]
      };
    } else {
      initialState = {
        ...state.tasks.data[ownProps.id],
        teamId: [
          {
            value: state.tasks.data[ownProps.id].teamId,
            label: state.tasks.data[ownProps.id].teamName
          }
        ],
        assignedTo: [
          {
            value: state.tasks.data[ownProps.id].assignedTo,
            label: state.tasks.data[ownProps.id].assignedName
          }
        ]
      };
    }
    return {
      initialState: initialState,
      teams: state.teams,
      allUsers: tempUsers,
      userDetails: state.userDetails
    };
  } else
    return {
      initialState: {
        name: "",
        deadline: "",
        description: "",
        priority: "5",
        status: "Not-started",
        type: "solo",
        teamId: null,
        teamName: null,
        assignedTo: null,
        assignedName: null
      },
      teams: state.teams,
      allUsers: [],
      userDetails: state.userDetails
    };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
