import React, { Fragment } from "react";
import "./InitialPage.css";
import Carausel from "./Carausel";
import HowDeadlineWorks from "./HowDeadlineWorks";

export default class InitialPage extends React.Component {
  render() {
    return (
      <main>
        <Fragment >
          <Carausel />
          <HowDeadlineWorks />
        
        </Fragment>
      </main>
    );
  }
}
