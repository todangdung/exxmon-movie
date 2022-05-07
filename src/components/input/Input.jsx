import React from "react";

import "./input.scss";
const Input = (props) => {
  return (
    <div className="input">
      <i className="bi bi-search"></i>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange ? (e) => props.onChange(e) : null}
        style={{ width: props.width + "px" }}
      />
    </div>
  );
};

export default Input;
