import React from 'react';

import Image1 from './../assets/HowDeadlineWorks/11.png';
import Image2 from './../assets/HowDeadlineWorks/12.png';
import Image3 from './../assets/HowDeadlineWorks/13.png';
import Image4 from './../assets/HowDeadlineWorks/14.png';

import './HowDeadlineWorks.css';

const HowDeadlineWorks = () => (
  <section className="how-we-work wow fadeIn">
    <div className="container">
      <div className="how-we-work-heading">
        <h1>MORE FEATURES OF DEADLINE </h1>
      </div>
      <div className="how-we-work-container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <img src={Image1} className="card-img-top" alt="" />
              {/* <div className="card-body" /> */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <img src={Image2} className="card-img-top" alt="" />
              <div className="card-body" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <img src={Image3} className="card-img-top" alt="" />
                <div className="card-body" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <img src={Image4} className="card-img-top" alt="" />
                <div className="card-body" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HowDeadlineWorks;
