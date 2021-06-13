import firebase from "./../config/fbConfig";
//it is an action creator and also dispatches an action whenever there is a change in the user details
export const userDetails = dispatch => {
  let user = firebase.auth().currentUser; //get he user information of the current user
  let db = firebase.firestore(); //gets the firestore database
  db.collection("users")
    .doc(user.uid) //user id of the user
    .onSnapshot(doc => { //to notice if there is a change to the user details
      let userInformation = doc.data(); //saves the doc of the user details
      dispatch({
        type: "USER_DETAILS_RECEIVED",
        userDetails: userInformation
      });
    });
 //an action that is created for the first time
  return {
    type: "GET_USER_DETAILS"
  };
};
