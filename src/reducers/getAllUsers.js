const getAllUsers = (state = {}, action = "")=>{
    switch (action.type) {
        case "GET_ALL_USERS":{
            //waiting for getting the usernames of all the application
            return {...state, loading:true};
        }
        case "ALL_USERS_RECEIVED":{
            //all username of the applications are received
            return {...state,data : action.allUsers,loading : false};
        }
        default:
            return state;
    }
}

export default getAllUsers;