import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import DashBoard from "./dashboard/DashBoard";
import ShowAllTasks from "./dashboard/ShowAllTasks";
import ProtectedRoute from "./ProtectedRoute";
import InitialPage from "./InitialPage";

import Profile from "./dashboard/Profile";
import "./Navigation.css";

import TeamList from "./dashboard/TeamList";

import Teamdashboard from "./TeamDashboard/Teamdashboard";
import Notfound from "./notFound";
// import { getAllUsers } from './../actions/getAllUsers';

//this class navigates to different pages of the app based on the user input and on the state of the
// user i.e. if the user is logged in or not.

class Navigation extends React.Component {
  render() {
    return (
      
        <Switch>
          <ProtectedRoute 
           authenticated={false}
           exact path="/" 
          /> 
          <Route  path="/home" component={InitialPage} />
          {/* the routing is protected based on the login-logout state of the user */}
          <ProtectedRoute
            authenticated={!this.props.authenticated}
            path="/login"
            component={LoginForm}
          />
          <ProtectedRoute
            path="/signup"
            authenticated={!this.props.authenticated}
            component={SignupForm}
          />
          <ProtectedRoute
            authenticated={this.props.authenticated}
            path="/dashboard"
            component={DashBoard}
          />
          <ProtectedRoute
            authenticated={this.props.authenticated}
            path="/showalltasks"
            component={ShowAllTasks}
          />
          <ProtectedRoute
            authenticated={this.props.authenticated}
            path="/profile"
            component={Profile}
          />
          <ProtectedRoute
            authenticated={this.props.authenticated}
            path="/teamlist"
            component={TeamList}
          />
          <ProtectedRoute
            authenticated={this.props.authenticated}
            exact
            path="/teamdashboard/:id"
            component={Teamdashboard}
          />
          <Route component={Notfound} />
        </Switch>
    );
    
  }
}

export default Navigation;
