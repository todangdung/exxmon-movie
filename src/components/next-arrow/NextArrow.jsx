import React from "react";
import "./next-arrow.scss";

const NextArrow = (props) => {
  return (
    <div
      className={`${props.className} ${props.class}`}
      onClick={props.onClick}
    >
      <i className="bi bi-chevron-right icon"></i>
    </div>
  );
};

export default NextArrow;
