// a reducer function to change the status of the checked-unchecked box based on the its criteria i.e.
// taskstatus e.g. completed,inprogress , tasktype e.g. team,personal , task priority e.g hign,low

const getCheckBoxStatus = (
  state = {
    statusCheckbox: [],
    typeCheckbox: [],
    priorityCheckbox: [],
    deadlinePassedCheckbox: []
  },
  action = ""
) => {
  switch (action.type) {
    // here is the logic
    case "CHECKBOX_STATUS_CHANGED": {
      let newState = JSON.parse(JSON.stringify(state)); // a deep copy of the state
      if (action.criteria === "taskStatus") {
        if (action.status) {
          // based on the checked status it adds or romoves from the array
          newState.statusCheckbox.push(action.value); // adds
        } else {
          newState.statusCheckbox.forEach((value, index) => {
            if (value === action.value)
              newState.statusCheckbox.splice(index, 1); // removes the recent unchecked value
          });
        }
      } else if (action.criteria === "taskType") {
        if (action.status) {
          newState.typeCheckbox.push(action.value);
        } else {
          newState.typeCheckbox.forEach((value, index) => {
            if (value === action.value) newState.typeCheckbox.splice(index, 1);
          });
        }
      } else if (action.criteria === "deadline-passed") {
        if (action.status) {
          newState.deadlinePassedCheckbox.push(action.value);
        } else {
          newState.deadlinePassedCheckbox = [];
        }
      } else {
        if (action.status) {
          newState.priorityCheckbox.push(action.value);
        } else {
          newState.priorityCheckbox.forEach((value, index) => {
            if (value === action.value)
              newState.priorityCheckbox.splice(index, 1);
          });
        }
      }

      return newState;
    }
    case "CLEAR_ALL_CHECKBOX": {
      return {
        statusCheckbox: [],
        typeCheckbox: [],
        priorityCheckbox: [],
        deadlinePassedCheckbox: []
      };
    }
    default:
      return state;
  }
};

export default getCheckBoxStatus;
