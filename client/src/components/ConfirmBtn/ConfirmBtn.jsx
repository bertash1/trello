import React from "react";
import "./style.sass";

const ConfirmBtn = ({ value }) => {
  return <input className="add-form__submit" type="submit" value={value} />;
};

export default ConfirmBtn;
