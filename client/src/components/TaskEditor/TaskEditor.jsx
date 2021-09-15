import React, { useRef, useEffect, useState } from "react";
import ConfirmBtn from "../ConfirmBtn/ConfirmBtn";
import "./style.sass";

const TaskEditor = ({ title, isEdited, setIsEdited }) => {
  const [editedTask, setEditedTask] = useState(title);

  const textRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEdited(false);
  };

  const handleChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  useEffect(() => {
    textRef.current.focus();
  }, [isEdited]);

  return (
    <>
      <form className="edit-form" onSubmit={handleSubmit}>
        <textarea
          className="edit-form__textarea"
          type="text"
          ref={textRef}
          value={editedTask}
          onFocus={handleFocus}
          onChange={handleChange}
        />
        <ConfirmBtn value="Save" />
      </form>
    </>
  );
};

export default TaskEditor;
