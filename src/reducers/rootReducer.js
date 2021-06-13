import { combineReducers } from "redux";
import getUserDetails from './getUserDetails'
import getAllTasks from "./getAllTasks";
import getSearchValue from './getSearchValue';
import getUserTeams from './getUserTeams';
import getAllUsers from './getAllUsers';
import getCheckBoxStatus from './getCheckBoxStatus';
import getNotifications from './getNotifications';
import getTeamTasks from './getTeamTasks';

// the main components of the redux state is discussed below and based on this we need to apply the logic
// ****** tasks :{ data : { taskID : { all the properties of the tasks are stored here refer the redux-logger in
//                            the console },
//                  taskID : { all the properties of the tasks are stored here refer the redux-logger in
//                            the console 
//                               comments: {all the comments of the task}
//                               },
//                         },
//                 loading: true or false
//                       } ********

// ****** userDetails : { data : { userId: {all the properties of the user}},
//                        loading : true or false
//                       } ********

// ***** searchValue : the given search value *******
// ******* checkboxStatus : { 
//                                statusCheckbox: [] // here completed,inprogress etc is stored
//                                typeCheckbox: []   // here team or personal is stored
//                                priorityCheckbox: [] //high.low.medium is stored
//                                deadline-passed: []
//                            }
//                    }*******

// ******* notifications {
//              data : { notificationID : { all the notificaton properties}

//                     }
//          }********


const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    //makes the state undefined whenever the users logged outs
    state = undefined
  }
  return appReducer(state, action)
}

const appReducer = combineReducers({
  userDetails: getUserDetails,
  tasks: getAllTasks,
  searchValue : getSearchValue,
  teams : getUserTeams,
  allUsers: getAllUsers,
  checkboxStatus : getCheckBoxStatus,
  notifications: getNotifications,
  teamTasks: getTeamTasks
});

export default rootReducer;
