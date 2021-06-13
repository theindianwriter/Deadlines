import firebase from "./../config/fbConfig";
//an action creator and also monitors any change in the tasks of the teams associated with the user
export const teamsTasks = dispatch => {
  let user = firebase.auth().currentUser; // gets the user information
  let db = firebase.firestore(); //gets the database
  //gets into the users to know which team they are associated with
  db.collection("users")
    .doc(user.uid)
    .collection("inTeams")
    .onSnapshot(querySnapshot => { //gets all the docs containing the information about its teams
      let teamTask = {};
      querySnapshot.forEach(doc => {
        let tempTeam = doc.data().teamId; //stores the teamid of a particular team
        //gets into the respective team and then into their tasks id
        db.collection("teams")
          .doc(tempTeam)
          .collection("teamTask")
          .orderBy("index")
          .orderBy("priority", "desc") //orders the tasks based on index and priority
          .onSnapshot(querySnapshot => {
            let tasks = {}; // to store all the tasks of a respective team
            querySnapshot.forEach(doc => {
              let taskId = doc.data().taskId; //task id of a particular teamtask
              //gets into the task table and subcribe to that particular task
              db.collection("task")
                .doc(taskId)
                .onSnapshot(doc => {
                  tasks[taskId] = doc.data();
                  if(doc.data() !== undefined){
                  dispatch({
                    type: "A_TEAM_TASK_RECEIVED",
                    taskId: taskId,
                    teamId: tempTeam,
                    task: doc.data()
                  })
                }
                  //to subscribe to the comments of the task
                  db.collection("task")
                    .doc(doc.id)
                    .collection("comments")
                    .orderBy("index")
                    .onSnapshot(function(querySnapshot) {
                      let comments = {};//stores the comments of the respective task
                      querySnapshot.forEach(function(doc) {
                        comments[doc.id] = doc.data();
                      });
                      dispatch({
                        type: "COMMENT_OF_A_TASK_IN_A_TEAM_RECEIVED",
                        taskId: doc.id,
                        teamId: tempTeam,
                        comments: comments
                      });
                    });
                });
            });
            //dispatches an action containing the information of the task of the particular team
            dispatch({
              type: "TASKS_OF_A_TEAM_RECEIVED",
              teamId: tempTeam,
              tasks: tasks
            });
            teamTask[tempTeam] = tasks;
          });
      });
      //dispatches the tasks of all the teams
      dispatch({
        type: "USER_TEAM_TASKS_RECEIVED",
        tasks: teamTask
      });
    });
    //the default action to be dispatched
  return {
    type: "GET_USER_TEAM_TASKS"
  };
};
