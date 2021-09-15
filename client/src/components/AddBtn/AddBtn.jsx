import React, { useState, useRef, useEffect } from "react";
import CloseBtn from "../CloseBtn/CloseBtn";
import ConfirmBtn from "../ConfirmBtn/ConfirmBtn";
import OptionsBtn from "../OptionsBtn/OptionsBtn";
import "./style.sass";

const AddBtn = ({ title }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [newTask, setNewTask] = useState("");
  const textRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask) {
      setNewTask("");
    } else {
      textRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    if (isOpened && !newTask) {
      textRef.current.focus();
    }
    if (!isOpened) {
      setNewTask("");
    }
  }, [isOpened, newTask]);

  return (
    <>
      {!isOpened ? (
        <button className="add-btn" onClick={handleClick}>
          <span className="add-btn__hor-line"></span>
          <span className="add-btn__vert-line"></span>
          <span className="add-btn__title">{title}</span>
        </button>
      ) : (
        <form className="add-form" onSubmit={handleSubmit}>
          <textarea
            className="add-form__textarea"
            type="text"
            placeholder="Enter a title for this task..."
            ref={textRef}
            onChange={handleInputChange}
            value={newTask}
          />
          <div className="add-form__controls">
            <div className="add-form__btn-wrapper">
              <ConfirmBtn value="Add task" />
              <CloseBtn handleClick={handleClick} />
            </div>
            <OptionsBtn />
          </div>
        </form>
      )}
    </>
  );
};

export default AddBtn;
