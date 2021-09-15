import React from "react";
import "./style.sass";

const Overlay = ({ fn }) => {
  return <div className="overlay" onClick={() => fn(false)}></div>;
};

export default Overlay;
