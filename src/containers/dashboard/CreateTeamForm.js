import React from "react";
import "../LoginForm.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from 'react-select';
import firebase from "../../config/fbConfig";
import toaster from "toasted-notes";
import { getTime } from "../../helpers/helpers";

export class CreateTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        valid: true
      },
      description: {
        value: "",
        valid: true
      },
      members: {
        value: [],
        valid: true
      },
      allUsers: [],
      createTeamConfirm: false
    };
  }
  //Function called when values are entered
  handleChange = event => {
    let key = event.target.name;
    let val = event.target.value;
    this.setState({
      [key]: {
        value: val,
        valid: this.checkValidation(val.length)
      }
    });
  };
  //Converting the data of all-users in the form of array-of-objects for react-select
  componentWillMount() {
    let b = [];
    Object.keys(this.props.allUsers.data).forEach(user => {
      var a = {
        value: user,
        label: this.props.allUsers.data[user]
      };
      b.push(a);
    });
    this.setState({ allUsers: b });
  }
  //To set the flag for creating team form
  componentDidMount() {
    this.setState({
      createTeamConfirm:
        this.state.name.valid &&
        this.state.description.valid &&
        this.state.members.valid
    });
  }
  saveAllValues = event => {
    event.preventDefault();
    //Valdidation of the enetred values
    if (
      !(this.state.name.value.length && this.state.description.value.length)
    ) {
      toaster.notify("Please fill up all the input fields ");
      return;
    }
    if (this.state.createTeamConfirm) {
      const user = firebase.auth().currentUser;
      let teamMembers = this.state.members.value;
      let creatorName = this.props.creatorUsername;
      teamMembers.push({ id: user.uid, username: this.props.creatorUsername });
      let teamDetails = {
        createdOn: getTime(new Date()),
        teamName: this.state.name.value,
        description: this.state.description.value,
        createdBy: user.uid,
        creatorUsername: this.props.creatorUsername
      };
      let db = firebase.firestore();
      let teamId = null;
      db.collection("teams")
        .add(teamDetails)
        .then(function (docref) {
          teamId = docref.id;
          teamMembers.forEach(user => {
            db.collection("teams")
              .doc(docref.id)
              .collection("teamMembers")
              .doc(user.id)
              .set({ userId: user.id, username: user.username });
            db.collection("users")
              .doc(user.id)
              .collection("inTeams")
              .doc(teamId)
              .set({ teamId: docref.id });
            db.collection("users")
              .doc(user.id)
              .collection("notifications")
              .doc()
              .set({
                title: "YOU WERE ADDED TO A NEW TEAM",
                body: `team "${teamDetails.teamName}" created by "${creatorName}" welcomes you!!`,
                createdOn: getTime(new Date()),
                index: Date.now()
              });
          });
        })
        .then(() => {
          toaster.notify(<div>New team created</div>);
          this.props.closePopUp();
          this.props.history.push({
            pathname: `/teamdashboard/${teamId}`,
            state: {
              teamName: this.state.name.value,
              teamId: teamId
            }
          });
        })
        .catch(error => {
          toaster.notify(<div>{error.message}</div>);
        });
    }
  };
  //Validation
  checkValidation = value => {
    return value > 0;
  };
  // When a new member is selected to be a team member
  addMember = selectedMember => {
    if (selectedMember === null) {
      this.setState({
        members: {
          value: [],
          valid: false
        }
      })
    }
    else {
      let tempMembers = [];
      for (let i = 0; i < selectedMember.length; i = i + 1) {
        tempMembers.push({ id: selectedMember[i].value, username: selectedMember[i].label })
      }
      this.setState({
        members: {
          value: tempMembers,
          valid: true
        }
      });
    }
  }
  render() {
    return (
      <div className="formMain">
        <button id="cross" onClick={() => this.props.closePopUp()}>
          X
          </button>
        <form>
          <h2 className="formHeading">New Team Form</h2>
          <ul className="flex-outer">
            <li>
              <label>Name :</label>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                placeholder="Enter the name of the team"
              />
            </li>
            {!this.state.name.valid ? (
              <ul style={{ color: "red" }}>Name cannot be empty</ul>
            ) : null}
            <li>
              <label>Description :</label>
              <textarea
                rows="6"
                name="description"
                onChange={this.handleChange}
                placeholder="Enter team's description"
              />
            </li>
            {!this.state.description.valid ? (
              <ul style={{ color: "red" }}>Description cannot be empty</ul>
            ) : null}
            <li>
              <label>Members: </label>
              <Select
                isMulti
                options={this.state.allUsers}
                onChange={this.addMember}
              />
            </li>
            {!this.state.members.valid ? (
              <ul style={{ color: "red" }}>
                There must at least be one member in the team
              </ul>
            ) : null}
            <li>
              <button onClick={this.saveAllValues}>Save</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = firebase.auth().currentUser;
  delete state.allUsers.data[user.uid];
  return {
    allUsers: state.allUsers,
    creatorUsername: state.userDetails.data.username
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTeamForm);
