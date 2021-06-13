// a reducer to save the user teams details and the team members of the respective teams
const getUserTeams = (state = {}, action = "") => {
  switch (action.type) {
    case "GET_USER_TEAMS": {
      //waiting for the user teams to be recieved
      return { ...state, loading: true };
    }
    case "USER_TEAMS_RECEIVED": {
      return { ...state, data: action.userTeams, loading: false };
    }
    case "TEAM_MEMBERS_RECEIVED":{
      let newState = JSON.parse(JSON.stringify(state));
      newState.data[action.teamId].teamMembers = action.teamMembers; //saves the teamMembers of the respective team
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default getUserTeams;
