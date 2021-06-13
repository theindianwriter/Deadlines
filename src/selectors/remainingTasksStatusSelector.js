import { createSelector } from "reselect";

const getAllTasks = state => state.tasks.data;

//return an object  of all the dates of the current week in yyyy-mm-dd format [week = sun - sat] and todays and tommorrows date 

export const getWeekDaysDetails = () => {
  let date = new Date();
  let day = date.getDay();
  let today = date.toISOString().split("T")[0];
  date.setDate(date.getDate() + 1);
  let tommorrow = date.toISOString().split("T")[0];
  let weeksDaysDate = [];
  for (let i = 0; day <= 6; day++) {
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + i++); // gets the next day
    nextDay = nextDay.toISOString().split("T")[0]; // saves the date in yyyy-mm-dd format
    weeksDaysDate.push(nextDay); // pushes to the array
  }

  return {
    tommorrow: tommorrow,
    today: today,
    weekDaysDate: weeksDaysDate
  };
};

// returns an object of the no. of tasks remained to be completed today,tommorrow and this week for a
// particular user

const getRemainingTasksStatus = createSelector(
  [getAllTasks],
  tasks => {
    let weekDaysDetails = getWeekDaysDetails();
    let tasksToday = 0;
    let tasksInweek = 0;
    let tasksTommorrow = 0;
    Object.values(tasks).forEach(task => {
      if (task.status !== "Completed") {
        if (weekDaysDetails.weekDaysDate.includes(task.deadline)) tasksInweek++; // if deadline in this week
        if (task.deadline === weekDaysDetails.today) tasksToday++;  // if deadline today
        if (task.deadline === weekDaysDetails.tommorrow) tasksTommorrow++; // if deadline tommorrow
      }
    });
    return {
      tasksToday: tasksToday,
      tasksTommorrow: tasksTommorrow,
      tasksInweek: tasksInweek
    };
  }
);

export default getRemainingTasksStatus;
