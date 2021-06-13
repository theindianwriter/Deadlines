import React from "react";
import { connect } from "react-redux";
import { search } from "./../actions/search";
import { bindActionCreators } from "redux";
// import { NavLink } from 'react-router-dom';
import Popup from "./dashboard/Popup";
import SearchResults from "./dashboard/SearchResults";

export class Searchbar extends React.Component {
  state = {
    popUpStatus: false
  };
 //for controlling the popup of the searchresult
  popUpOpen = () => {
    this.setState({
      popUpStatus: true
    });
  };

  popUpClose = () => {
    this.setState({ popUpStatus: false });
  };

  handleOnChange = event => {
    //whenever something is typed it dispatches an action which in turn changes the searc state of the redux
    this.props.search(event.target.value);
  };
  render() {
    return (
      <li className="nav-item">
        <input className="form-control mr-sm-2"
          style={{
            height: "35px",
            // float: "right",
            // padding: "6px 10px",
            // marginTop: "8px",
            // marginRight: "16px",
            // background: "#ddd",
            // fontSize: "17px",
            // border: "none",
            // cursor: "pointer",
            // width: "10%",
            // borderRadius: "10px"
          }}
          onFocus={this.popUpOpen}
          placeholder="Search for tasks.."
          disabled={this.state.popUpStatus ? "disabled": null}
        />
        {/* search results Component is send to the pop up Component which makes this SearchResults a popup */}
        <Popup show={this.state.popUpStatus} onClose={this.popUpClose} >
          <SearchResults closePopUp={this.popUpClose}/>
        </Popup>
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ search }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Searchbar);
