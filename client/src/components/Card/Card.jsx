import React from "react";
import AddBtn from "../AddBtn/AddBtn";
import OptionsBtn from "../OptionsBtn/OptionsBtn";
import Task from "../Task/Task";
import "./style.sass";

const Card = ({ title }) => {
  return (
    <div className="card">
      <div className="card__header">
        <span className="card__title">{title}</span>
        <OptionsBtn />
      </div>

      <Task title="Test1" />

      <AddBtn title="Add a task" />

      <div className="card__tasks-wrapper"></div>
    </div>
  );
};

export default Card;
