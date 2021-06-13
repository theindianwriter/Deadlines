import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./Deletebutton.css";
import toaster from "toasted-notes";
import firebase from "../../config/fbConfig";
import Popup from "./Popup";
import ConfirmationBox from "./ConfirmationBox";
import { getTime } from "./../../helpers/helpers";

export class Deletebutton extends React.Component {
  state = {
    popUpStatus: false
  };

  popUpOpen = () => {
    this.setState({
      popUpStatus: true
    });
  };

  popUpClose = () => {
    this.setState({ popUpStatus: false });
  };

  handlePopUp = () => {
    var db = firebase.firestore();
    //deletes the task
    db.collection("task")
      .doc(this.props.id)
      .delete()
      .then(() => {
        toaster.notify("task deleted ", {
          position: "bottom"
        });
        if (this.props.teamId) {
          //if it is team task then from the teamtask the id needs to be deleted it is done here
          const { teamMembers } = this.props;
          db.collection("teams")
            .doc(this.props.teamId)
            .collection("teamTask")
            .doc(this.props.id)
            .delete();
          //for sending notification to all the members of the group
          Object.keys(teamMembers).forEach(id => {
            db.collection("users")
              .doc(teamMembers[id].userId)
              .collection("notifications")
              .doc()
              .set({
                title: `THE TASK "${this.props.taskName}" WAS DELETED`,
                body: `the task from the team "${this.props.teamName}" has been deleted `,
                createdOn: getTime(new Date()),
                index: Date.now()
              });
          });
        }
        this.popUpClose();
      })
      .catch(error => {
        toaster.notify(<div>{error.message}</div>);
        this.popUpClose();
      });
  };

  render() {
    return (
      <span>
        <Popup show={this.state.popUpStatus} onClose={this.popUpClose}>
          <ConfirmationBox
            closePopUp={this.popUpClose}
            handlePopUp={this.handlePopUp}
            argument="ARE YOU SURE YOU WANT TO DELETE THE TASK"
          />
        </Popup>
        <button className="btn btn-primary" onClick={this.popUpOpen}>
        <i class="fas fa-trash-alt"></i>
          
        </button>
      </span>
    );
  }
}

function mapStateToProps(state, ownProps) {
  if (
    ownProps.teamId &&
    state.teams.data[ownProps.teamId] !== undefined &&
    state.teamTasks.data[ownProps.teamId] !== undefined &&
    state.teamTasks.data[ownProps.teamId][ownProps.id] !== undefined
  ) {
    return {
      teamMembers: state.teams.data[ownProps.teamId].teamMembers,
      teamName: state.teams.data[ownProps.teamId].teamName,
      taskName: state.teamTasks.data[ownProps.teamId][ownProps.id].name
    };
  } else return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deletebutton);
