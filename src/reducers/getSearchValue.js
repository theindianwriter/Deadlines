
// a reducer function to  save the search value onto the redux-store

const getSearchValue = (state = "", action = "") => {
    switch (action.type) {
      case "SEARCH":{
        let newState = JSON.parse(JSON.stringify(state));
        newState = action.payload; //payload conatins the string typed by the user to searched
        return newState;
      }
      default:
        return state;
    }
  };
  
  export default getSearchValue;