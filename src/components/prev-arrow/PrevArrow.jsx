import React from "react";
import "./prev-arrow.scss";

const PrevArrow = (props) => {
  return (
    <div
      className={`${props.className} ${props.class}`}
      onClick={props.onClick}
    >
      <i className="bi bi-chevron-left icon"></i>
    </div>
  );
};

export default PrevArrow;
