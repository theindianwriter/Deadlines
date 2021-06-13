import React from "react";
import { NavLink } from "react-router-dom";
import LogOut from "./LogOut";

import "./Navigation.css";
import Searchbar from "./Searchbar";

import { NotificationButton } from "./NotificationButton";

import Logo from "././../assets/header/logo2.png";

class Header extends React.Component {
  render() {
    return (
      <nav
        className={
          this.props.smoothTransition
            ? "navbar fixed-top navbar-expand-lg navbar-light scrolling-navbar top-nav-collapse bg-dark"
            : "navbar fixed-top navbar-expand-lg navbar-light scrolling-navbar bg_black "
        }

        //data-toggle="affix"
      >
        <div className="container nav_container">
          <NavLink className="navbar-brand" to="/">
            <img src={Logo} alt="Deadline" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* based on the authenticated state of the user i.e logged in or logged out the following components are rendered */}
            {this.props.authenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to="/home" className="btn btn-dark">
                    HOME
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className="btn btn-dark">
                    PROFILE
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/dashboard" className="btn btn-dark">
                    MY DASHBOARD
                  </NavLink>
                </li>
                <NotificationButton />
                <Searchbar />
                <LogOut />
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                  <NavLink to="/home" className="btn btn-dark">
                    {/* <i className="fa fa-fw fa-home" /> */}
                    HOME
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-dark">
                    {/* <i className="fa fa-fw fa-user" /> */}
                    LOGIN
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="btn btn-dark">
                    {/* <i className="fa fa-fw fa-sign-in" />{" "} */}
                    SIGN UP
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
