import React from "react";
import firebase from "firebase/app";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import Popup from "./dashboard/Popup";
import { connect } from "react-redux";
import ConfirmationBox from "./dashboard/ConfirmationBox";

class LogOut extends React.Component {
  state = {
    popUpStatus: false, //controls the state of the pop up
  };

  popUpOpen = () => {
    this.setState({
      popUpStatus: true,
    });
  };

  popUpClose = () => {
    this.setState({ popUpStatus: false });
  };

  logOutUser = () => {
    //onlogging out the redux state should be made undefined so this function handlelogout is used
    this.props.handleOnLogOut();
    firebase
      .auth()
      .signOut()
      .then(() => {
        toaster.notify("successfully logged out");
      });
  };

  render() {
    return (
      <li className="nav-item" >
        <Popup show={this.state.popUpStatus} onClose={this.popUpClose}>
          <ConfirmationBox
            closePopUp={this.popUpClose}
            handlePopUp={this.logOutUser}
            argument="ARE YOU SURE YOU WANT TO LOG OUT FROM DEADLINE"
          />
        </Popup>
        <button onClick={this.popUpOpen} className = "btn   btn-dark" style={{fontSize : "14px",fontWeight: "bold",backgroundColor:"#343a40",color: "white"}}>LOGOUT</button>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleOnLogOut: () => {
      return dispatch({
        type: "LOGOUT_USER",
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(LogOut);
