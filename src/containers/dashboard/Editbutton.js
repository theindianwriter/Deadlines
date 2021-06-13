import React from "react";
import "./sidebarButton.css";
import CreateTaskForm from "./CreateTaskForm";
import Popup from "./Popup";

export default class Editbutton extends React.Component {
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
  render() {
    return (
      <span>
        <button className="btn btn-success m-3"  onClick={this.popUpOpen}><i class="fas fa-edit"></i></button>
        <Popup show={this.state.popUpStatus} onClose={this.popUpClose}>
          <CreateTaskForm id={this.props.id} closePopUp={this.popUpClose} teamId ={this.props.teamId}/>
        </Popup>
      </span>
    );
  }
}
