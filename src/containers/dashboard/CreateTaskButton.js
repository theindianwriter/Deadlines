import React from 'react';
import  CreateTaskForm  from './CreateTaskForm';
import './sidebarButton.css';
import Popup from './Popup';

class CreateTaskButton extends React.Component {
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
      <button className="sidebarButton" onClick={this.popUpOpen}>Create New Task</button>
      <Popup show = {this.state.popUpStatus} onClose={this.popUpClose}>
        <CreateTaskForm closePopUp={this.popUpClose}/>
      </Popup>
      </span>
    )
  }
}

export default CreateTaskButton;