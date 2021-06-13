import React from "react";
import './ConfirmationBox.css';

const ConfirmationBox = props => {
  return (
    <div id="confirmationBox">
      <h4>{props.argument}</h4>
      <button style = {{margin: "0 auto",backgroundColor:"red",color:"white"}}onClick={props.handlePopUp}>Yes</button>
      <button style = {{margin: "0 auto",backgroundColor:"red",color:"white"}} onClick={props.closePopUp}>No</button>
    </div>
  );
};

export default ConfirmationBox;
