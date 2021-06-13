import React from "react";
import { NavLink } from "react-router-dom";

import Slide1 from "./../assets/home/Slide1.png";
import Slide2 from "./../assets/home/Slide2.png";
import Slide3 from "./../assets/home/Slide3.png";

import "./Carausel.css";

const numberOfSlides = 3;
class Carausel extends React.Component {
  state = {
    activeIndex: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.goToNextSlide, 5000);
  }

  goToNextSlide = () => {
    this.setState((prevState) => ({
      activeIndex: (prevState.activeIndex + 1) % numberOfSlides,
    }));
  };

  goToPrevSlide = () => {
    this.setState((prevState) => ({
      activeIndex:
        prevState.activeIndex === 0
          ? 2
          : (prevState.activeIndex - 1) % numberOfSlides,
    }));
  };

  moveBySlideNumber = (number) => {
    this.setState({
      activeIndex: number,
    });
  };

  componentDidUnMount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div
        id="carousel-example-1z"
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
        {/* Indicators */}
        <ol className="carousel-indicators">
          <li
            onClick={() => this.moveBySlideNumber(0)}
            className={this.state.activeIndex === 0 ? "active" : "notactive"}
          />
          <li
            onClick={() => this.moveBySlideNumber(1)}
            className={this.state.activeIndex === 1 ? "active" : "notactive"}
          />
          <li
            onClick={() => this.moveBySlideNumber(2)}
            className={this.state.activeIndex === 2 ? "active" : "notactive"}
          />
        </ol>
        {/* /.Indicators */}

        {/* Slides */}
        <div className="carousel-inner" role="listbox">
          {/* First slide */}
          <div
            className={
              this.state.activeIndex === 0
                ? "carousel-item active"
                : "carousel-item"
            }
          >
            <div className="mask">
              <div className="row ">
                <div className="col-md-6 col-lg-5 ml-auto d-flex align-items-center mt-4 mt-md-0 col1">
                  <div className="text-container  mx-5 wow fadeIn">
                    <h1>Deadline - the new sensation for managing work.</h1>
                    <p>
                      Always wondered why you failed at doing your work in
                      time.Here is the way to achieve it and many more things in
                      a smart way.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col2">
                  <img src={Slide1} alt="" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              this.state.activeIndex === 1
                ? "carousel-item active"
                : "carousel-item"
            }
          >
            <div className="mask">
              <div className="row ">
                <div className="col-md-6 col-lg-5 ml-auto d-flex align-items-center mt-4 mt-md-0 col1">
                  <div className="text-container  mx-5 wow fadeIn">
                    <h1>Manage your team efficiently.</h1>
                    <p>
                      Every team has a unique process for executing their work.
                      Assign and discuss your team's work for a better workflow
                      experience.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col2">
                  <img src={Slide2} alt="" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              this.state.activeIndex === 2
                ? "carousel-item active"
                : "carousel-item"
            }
          >
            <div className="mask">
              <div className="row">
                <div className="col-md-6 col-lg-5 ml-auto d-flex align-items-center mt-4 mt-md-0 col1">
                  <div className="text-container  mx-5 wow fadeIn">
                    <h1>Track your work and grow faster.</h1>
                    <p>
                      Prioritize and assign deadline to your work and grow
                      smartly both in your professional as well as your personal
                      growth.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col2">
                  <img src={Slide3} alt="" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /.Slides */}

        {/* Controls */}
        <div
          className="carousel-control-prev"
          onClick={this.goToPrevSlide}
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </div>
        <div
          className="carousel-control-next"
          onClick={this.goToNextSlide}
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </div>
      </div>
    );
  }
}
export default Carausel;
