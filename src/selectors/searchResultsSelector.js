import { createSelector } from "reselect";

const getSearchValue = state => state.searchValue; // gets the search value from the redux state
const getAllTasks = state => state.tasks.data; // get all the tasks


// it returns all the tasks based on the search value 
const searchResultsSelector = createSelector(
[getSearchValue,getAllTasks],
 (searchValue,tasks) =>{
     let searchResults = {};//to stores the earch results
     // here is the logic 
     if(searchValue.length){
     Object.keys(tasks).forEach(taskId=>{
         if(tasks[taskId].name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1){ // i fany part of the search 
            // matches the search value then that task is selected
            searchResults[taskId] = tasks[taskId];
         }
     });
    }
     return searchResults;
 }
);


export default searchResultsSelector;