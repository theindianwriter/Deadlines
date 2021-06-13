import React from "react";
import "./notFound.css";

import ErrorImg from "././../assets/notFound/error_image.jpg";

const NotFound = () => (
  <div className="error-404">
    <div className="image_conatainer">
        <img src={ErrorImg} alt="error 404" className="image" />
    </div>
  </div>
);

export default NotFound;
