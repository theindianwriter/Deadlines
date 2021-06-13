// a reducer function to store the recieved details of the user onto the redux-store

export default function (state = '', action) {
  switch (action.type) {
    case "GET_USER_DETAILS":{
      //waiting for the user details
      return { ...state,loading : true}
    }
    case "USER_DETAILS_RECEIVED":
      {
        return {...state,data : action.userDetails,loading : false};
      }
      
    default:
      return state;
  }
}