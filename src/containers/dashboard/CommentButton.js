import React from "react";
import Popup from './Popup';
import Comments from "./Comments";


export default class CommentButton extends React.Component {
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
      <button className="btn btn-info "   onClick={this.popUpOpen}><i class="fa fa-comments" aria-hidden="true"></i></button>
      <Popup show = {this.state.popUpStatus} onClose={this.popUpClose}>
        <Comments task={this.props.task} id={this.props.id} teamId={this.props.teamId} closePopUp={this.popUpClose}/>
      </Popup>
      </span>
    );
  }
}


