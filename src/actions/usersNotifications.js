import firebase from "./../config/fbConfig";


//it is an action creator and it also dispatches an action whenever there is a change in the notification of the user 
export const usersNotifications = dispatch => {
  let user = firebase.auth().currentUser; //get the user information of the current user
  let db = firebase.firestore(); //gets the database
  // here is a database query to subscribe to a particular users notification
  db.collection("users") 
    .doc(user.uid)
    .collection("notifications")
    .orderBy("index","desc") //order the retrieved notification in desc order of the index
    .limit(10) // only top 10 notifications are retreived
    .onSnapshot(function(querySnapshot) {
      let userNotifications = {}; //to save all the users notification with particular notification doc id as the key and
                                   // and notification data as the value
      querySnapshot.forEach(function(doc) {
        userNotifications[doc.id] = doc.data(); 
      });
      dispatch({
        type: "USER_NOTIFICATIONS_RECEIVED",
        userNotifications: userNotifications
      });
    });

    //the default action
  return {
    type: "GET_USER_NOTIFICATIONS"
  };
};
