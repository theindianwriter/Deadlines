import { createSelector } from "reselect";
const getAllTasks = state => state.tasks.data; // we get all the tasks
const getAllTeamTasks = state => state.teamTasks.data;
const getTeamId = (state, teamId) => teamId;

export const getUpcomingSevenDays = () => {
  let date = new Date();
  let upcomingSevenDaysDate = [];
  for (let i = 0; i <= 6; i++) {
    let nextDay = new Date();
    nextDay.setDate(date.getDate() + i); // gets the next day
    nextDay = nextDay.toISOString().split("T")[0]; //saves the date in yyyy-mm-dd format
    upcomingSevenDaysDate.push(nextDay); // pushes to the array
  }
  return upcomingSevenDaysDate;
};

//it returns an object containing all the unfinished tasks of the week with different priorities sorted

export const getRecentTasksSelector = createSelector(
  [getAllTasks],
  allTasks => {
    let upcomingSevenDaysDate = getUpcomingSevenDays();
    let recentTasks = {};

    Object.keys(allTasks).forEach(id => {
      if (
        allTasks[id].status !== "Completed" &&
        upcomingSevenDaysDate.includes(allTasks[id].deadline)
      ) {
        recentTasks[id] = allTasks[id];
      }
    });
    return recentTasks;
  }
);
export const getRecentTeamTasksSelector = createSelector(
  [getAllTeamTasks, getTeamId],
  (allTeamTasks, teamId) => {
    let upcomingSevenDaysDate = getUpcomingSevenDays();
    let recentTasks = {};
    Object.keys(allTeamTasks).forEach(tid => {
      if (tid === teamId) {
        Object.keys(allTeamTasks[tid]).forEach(id => {
          if (
            allTeamTasks[tid][id].status !== "Completed" &&
            upcomingSevenDaysDate.includes(allTeamTasks[tid][id].deadline)
          ) {
            recentTasks[id] = allTeamTasks[tid][id];
          }
        });
      }
    });
    return recentTasks;
  }
);
