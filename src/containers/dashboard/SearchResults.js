import React from "react";
import { connect } from "react-redux";
import "./ShowAllTasks.css";
import { bindActionCreators } from "redux";
import { search } from "../../actions/search";
import searchResultsSelector from "../../selectors/searchResultsSelector";
import "./SearchResults.css";

// it displays the search results based on task name
class SearchResults extends React.Component {
  handleOnChange = event => {
    this.props.search(event.target.value);
  };

  componentWillUnmount() {
    //on unmounting makes the search to be a empty string
    this.props.search("");
  }

  render() {
    let priorityLabel  = {
      9: "high",
      5: "medium",
      1: "low"
    };
    let { searchResults } = this.props;
    return (
      <div className="searchContainer">
        <div>
          <input
            className="searchbar"
            type="text"
            placeholder="Search by task name"
            onChange={this.handleOnChange}
          />
        </div>

        <div className="resultbox">
          {Object.keys(searchResults).map(id => { //id is the task id of the task
            return (
              <div className="result" key={id}>
                <span>{searchResults[id].name}</span>
                <br />
                <span>{searchResults[id].deadline}</span>
                <br />
                <span>{priorityLabel[searchResults[id].priority]}</span>
                <br />
                <span>{searchResults[id].status}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { searchResults: searchResultsSelector(state) }; //getting only the tasks based on the search 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ search }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
