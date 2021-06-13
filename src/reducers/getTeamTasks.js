//a reducer to save tehe changes in the team tasks of the user

const getTeamTasks = (state = { data: {} }, action = "") => {
  switch (action.type) {
    case "GET_USER_TEAM_TASKS": {
      return { ...state, loading: true };
    }
    case "USER_TEAM_TASKS_RECEIVED": {
      return { ...state, data: action.tasks, loading: false };
    }
    case "COMMENT_OF_A_TASK_IN_A_TEAM_RECEIVED": {
      let newState = JSON.parse(JSON.stringify(state));//to copy the state
      let tasks = newState.data[action.teamId]; //tasks contain all the tasks of the particular team
      if (tasks[action.taskId] !== undefined) { //if that particular task still exist
        tasks[action.taskId].comments = action.comments; //adds the comments of the tasks
      }
      newState.data[action.teamId] = tasks; //now saves the changes to the state 
      return newState;
    }
    case "TASKS_OF_A_TEAM_RECEIVED": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.data[action.teamId] = action.tasks;//the tasks of the particular team are saved
      return newState;
    }
    case "A_TEAM_TASK_RECEIVED":{
      let newState = JSON.parse(JSON.stringify(state));
      newState.data[action.teamId][action.taskId] = action.task;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default getTeamTasks;
