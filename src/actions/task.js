import firebase from "./../config/fbConfig";


export const userTasks = dispatch => {
  let db = firebase.firestore(); // gets the firestore database
  let user = firebase.auth().currentUser; //gets the user details of the current user 

  //whenever there is a change in the collection "task" of the database an action would be dispatched
  db.collection("task") 
    .where("assignedTo", "==", user.uid) 
    .orderBy("index")  //orders the retrieved documents by index in ascending order and then by priority in descending order
    .orderBy("priority", "desc")
    .onSnapshot(function(querySnapshot) { // whenever there would be change this function would be run
      let userTasks = {}; // to save all the usertasks 
      querySnapshot.forEach(function(doc) { //trying to subscribe for the change in comments of the given task
        db.collection("task")
          .doc(doc.id) //doc id of the particular task
          .collection("comments")
          .orderBy("index")
          .onSnapshot(function(querySnapshot) { //geting all the comments on by one in ascending order of index
            let comments = {};
            querySnapshot.forEach(function(doc) { //doc of the each comments
              comments[doc.id] = doc.data(); // stores each comment data in the object comment with key as the                                // comment id and value as the comment data
            });
            //dispatches an action and based on the  type of the action the state of the redux changes
            dispatch({
              type: "COMMENT_OF_A_USER_TASK_RECEIVED",
              id: doc.id,
              comments: comments
            });
          });
        userTasks[doc.id] = doc.data(); // saves the particular  task data 
      });
      dispatch({
        type: "USER_TASKS_RECEIVED",
        userTasks: userTasks
      });
    });

    // an action that gets dispatched only for the first time
  return {
    type: "GET_USER_TASKS"
  };
};
