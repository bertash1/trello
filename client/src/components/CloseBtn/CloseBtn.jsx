import React from "react";
import "./style.sass";

const CloseBtn = ({ handleClick }) => {
  return <div onClick={handleClick} className="add-form__close"></div>;
};

export default CloseBtn;
