import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./ShowAllTasks.css";

class TeamList extends React.Component {
  render() {
    const { data, loading } = this.props.teams;
    return loading ? (
      <div>Loading...</div>
    ) : data === null || data === undefined ? (
      <h2 className="heading">YOU ARE NOT IN ANY TEAM !</h2>
    ) : (
      <div>
        <h2 className="heading">YOUR TEAMS</h2>
        <div>
          {Object.keys(data).map(id => {
            let team = data[id];
            return (
              <div className="medium" key={id}>
                <span>Name: {team.teamName}</span>
                <br />
                <span>Description: {team.description}</span>
                <br />
                <span>Created on: {team.createdOn}</span>
                <NavLink to={{
                              pathname:`/teamdashboard/${id}`,
                              state:{
                                teamName:team.teamName,
                                teamId:id
                              }
                            }}>
                  <button>GO TO TEAMDASHBOARD</button>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    teams: state.teams
  };
};

export default connect(
  mapStateToProps,
  null
)(TeamList);
