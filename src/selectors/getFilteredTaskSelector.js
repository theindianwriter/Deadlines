import { createSelector } from "reselect";
const getAllTasks = state => state.tasks.data; // we get all the tasks
// we get all the checkbox status from the redux store
// the checkbox status are in the following ways - 1) statusCheckbox -- it stores the  checked status i.e
// completed,not-started,inprogress state of the tasks.
// 2) typeCheckbox - it stores the checked type i.e team task  or personal task
// 3) prioritycheckbox - it stores the checked priority i.e high,low,medium
const getCheckboxStatus = state => {
  return {
    statusCheckbox: state.checkboxStatus.statusCheckbox,
    typeCheckbox: state.checkboxStatus.typeCheckbox,
    priorityCheckbox: state.checkboxStatus.priorityCheckbox,
    deadlinePassedCheckbox: state.checkboxStatus.deadlinePassedCheckbox
  };
};
// we filter the tasks based on the checkbox status and store it in the data named object
const getFilteredTaskSelector = createSelector(
  [getAllTasks, getCheckboxStatus],
  (allTask, checkboxStatus) => {
    let tasks = {};
    // here is the logic
    let current_datetime = new Date();
    let date1 = new Date("01-01-2000"); // the reference point
    // to get the date in this format
    let date2 = new Date(
      current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate()
    );
    //todayIndex contains the no. of time passed from the reference point to this particular day
    let todayIndex = date2.getTime() - date1.getTime() + 19800000; // gets the index if the deadline of the task had beeb today
    Object.keys(allTask).forEach(taskID => {
      if (
        (!checkboxStatus.statusCheckbox.length ||
          checkboxStatus.statusCheckbox.includes(allTask[taskID].status)) &&
        (!checkboxStatus.typeCheckbox.length ||
          checkboxStatus.typeCheckbox.includes(allTask[taskID].type)) &&
        (!checkboxStatus.priorityCheckbox.length ||
          checkboxStatus.priorityCheckbox.includes(allTask[taskID].priority)) &&
        (!checkboxStatus.deadlinePassedCheckbox.length ||
          todayIndex > allTask[taskID].index) //if taday index is greater than the task index naturally the deadline would be passed
      ) {
        tasks[taskID] = allTask[taskID];
      }
    });
    return { tasks };
  }
);

export default getFilteredTaskSelector;
