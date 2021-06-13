import firebase from "./../config/fbConfig";


// whenever the userteams details are changed or the members are changed a action is dispatched
export const userTeams = dispatch => {
  let user = firebase.auth().currentUser; //gets the current user
  let db = firebase.firestore(); //gets the firestore database
  db.collection("users")
    .doc(user.uid)
    .collection("inTeams") // gets in the collection inteams of the current user
    .onSnapshot(querySnapshot => {
      let data = {}; //to store all the teams information
      querySnapshot.forEach(doc => {
        let tempTeam = doc.data().teamId; // the teamId in which the user is partof
        db.collection("teams")
          .doc(tempTeam)
          .get()
          .then(doc => {
            data[tempTeam] = doc.data(); //getting in that particular team and then getting its data
          })
          .then(() => {
            //this is to get the team members of the particular team
            db.collection("teams")
              .doc(tempTeam)
              .collection("teamMembers")
              .onSnapshot(querySnapshot => { //gets the doc containing the userid and username of the team member
                let teamMembers = {};
                querySnapshot.forEach(doc => {
                  teamMembers[doc.id] = doc.data(); //saves the information of that particular team member
                });
                //dispatches an action containing all the information of the team members of a particular team 
                dispatch({
                  type: "TEAM_MEMBERS_RECEIVED",
                  teamId: tempTeam,
                  teamMembers: teamMembers
                });
              });
          });
      });
      //dispatches the users team information
      dispatch({ type: "USER_TEAMS_RECEIVED", userTeams: data });
    });
  return {
    type: "GET_USER_TEAMS"
  };
};
