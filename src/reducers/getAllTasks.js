// a reducer function to get all the user tasks assigned to it

const getAllTasks = (state = { data: {} }, action = "") => {
  switch (action.type) {
    case "GET_USER_TASKS": {
      //it is still waiting for the users tasks assigned to him/her so loading is set to set to true.
      return { ...state, loading: true };
    }
    case "USER_TASKS_RECEIVED": {
      //the tasks are received and the action.usertasks is an object with all the tasks information as the 
      // value and the task id as the key pair
      return { ...state, data: action.userTasks, loading: false };
    }

    case "COMMENT_OF_A_USER_TASK_RECEIVED": {
      let newState = JSON.parse(JSON.stringify(state));//a deep copy of the state
      //action.id contains the task id,comments is an object containing all the comments for that particular task
      newState.data[action.id].comments = action.comments;//saves the comments of that particular task
      return newState;
    }
    default:
      return state;
  }
};

export default getAllTasks;
