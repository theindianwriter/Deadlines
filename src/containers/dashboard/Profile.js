import React, { Component } from "react";
import { connect } from "react-redux";
import "./Profile.css";

class Profile extends Component {
  render() {
  
    return !this.props.userDetails ? (
      <div>loading...</div>
    ) : (
      <div className="profileContainer">
        <div className="avatar-flip">
          <img
            src="https://img.staticmb.com/mbcontent/images/uploads/2019/6/Deadline.jpg"
            height="150"
            width="150"
            alt=""
          />
          <img
            src="https://image.shutterstock.com/image-vector/freelance-programmer-struggling-deadline-outsource-260nw-787360333.jpg"
            height="150"
            width="150"
            alt=""
          />
        </div>
        <h2 id="profileName">
          {this.props.userDetails.data.name}
        </h2>
        <h4 id="profileEmail">{this.props.userDetails.data.email}</h4>
        <p>
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas
          sed diam eget risus varius blandit sit amet non magna ip sum dolore.
        </p>
        <p>
          Connec dolore ipsum faucibus mollis interdum. Donec ullamcorper nulla
          non metus auctor fringilla.
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails
  };
}

export default connect(
  mapStateToProps,
  null
)(Profile);
