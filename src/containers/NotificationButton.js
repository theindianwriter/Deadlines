import React from "react";
import Popup from "./dashboard/Popup";
import NotificationBox from "./dashboard/NotificationBox";

export class NotificationButton extends React.Component {
  state = {
    popUpStatus: false,
  };

  popUpOpen = () => {
    this.setState({
      popUpStatus: true,
    });
  };

  popUpClose = () => {
    this.setState({ popUpStatus: false });
  };
  render() {
    return (
      <li className="nav-item">
        <button
          className="btn btn-dark "
          style={{ fontSize : "14px",fontWeight: "bold",backgroundColor:"#343a40",color: "white" }}
          onClick={this.popUpOpen}
        >
          NOTIFICATION{" "}
          <sup style={{ color: "#FF4500", fontSize: "14px" }}>New</sup>
        </button>
        <Popup show={this.state.popUpStatus} onClose={this.popUpClose}>
          <NotificationBox closePopUp={this.popUpClose} />
        </Popup>
      </li>
    );
  }
}
