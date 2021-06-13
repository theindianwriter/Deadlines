import React from "react";
import CreateTeamForm from './CreateTeamForm';
import Popup from './Popup';
import './sidebarButton.css';

class CreateTeamButton extends React.Component {
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
      <button className="sidebarButton" onClick={this.popUpOpen}>Create New Team</button>
      <Popup show = {this.state.popUpStatus} onClose={this.popUpClose}>
        <CreateTeamForm closePopUp={this.popUpClose} history={this.props.history} />
      </Popup>
      </span>
    );
  }
}

export default CreateTeamButton;