import React from "react";
import "./Comments.css";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { getTime } from "../../helpers/helpers";

export class Comments extends React.Component {
  state = {
    comment: ""
  };

  handleOnChange = event => {
    let val = event.target.value;
    this.setState(() => ({
      comment: val
    }));
  };

  handleSend = () => {
    if (this.state.comment !== "") {
      let db = firebase.firestore();
      db.collection("task")
        .doc(this.props.id)
        .collection("comments")
        .doc()
        .set({
          content: this.state.comment,
          createdOn: getTime(new Date()),
          createdBy: this.props.userDetails.data.name,
          index: Date.now()
        });
      this.setState(() => ({ comment: "" }));
    }
  };
  render() {
    const { task, comments } = this.props;
    let priorityLabel = {
      9: "high",
      5: "medium",
      1: "low"
    };
    return (
      <div className="commentContainer">
        {/* <button id="cross" onClick={() => this.props.closePopUp()}>
          X
        </button> */}
        <div className="taskDetails">
          <p>
            name:<span style={{ color: "green" }}>{task.name}</span>
          </p>
          <span>deadline:</span>
          <span style={{ color: "red", marginRight: "10px" }}>
            {task.deadline}
          </span>
          <span>priority:</span>
          <span style={{ color: "red", marginRight: "10px" }}>
            {priorityLabel[task.priority]}
          </span>
          <span>status:</span>
          <span style={{ color: "red", marginRight: "10px" }}>
            {task.status}
          </span>
          <p>
            created on:<span style={{ color: "red" }}>{task.createdOn}</span>
          </p>
        </div>
        <div className="commentBox">
          {this.props.comments !== undefined
            ? Object.keys(this.props.comments).map(id => {
                return (
                  <div className="commentBody" key={id}>
                    <p>
                      {" "}
                      <span style={{ color: "black", float: "left" }}>
                        {comments[id].createdBy}
                      </span>
                      {comments[id].content} <br></br>
                      <span className="time-left">
                        {comments[id].createdOn}
                      </span>
                    </p>
                  </div>
                );
              })
            : null}
        </div>
        <div className="commentbar">
          <input
            type="text"
            placeholder="comment"
            value={this.state.comment}
            onChange={this.handleOnChange}
          />
          <button style={{ backgroundColor: "grey" }} onClick={this.handleSend}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let comments = {};
  if (ownProps.teamId) {
    comments = state.teamTasks.data[ownProps.teamId][ownProps.id].comments;
  } else {
    comments = state.tasks.data[ownProps.id].comments;
  }
  return {
    userDetails: state.userDetails,
    comments: comments
  };
};
export default connect(mapStateToProps, null)(Comments);
