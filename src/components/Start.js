import React from "react";

import "./Start.css";

const Start = (props) => {
  return (
    <div className="start--container">
      <h1 className="start--container-title">Quizzical</h1>
      <h2 className="start--container-subtitle">Query Your Brain</h2>
      <button
        className="start--container-button"
        onClick={() => {
          props.startQuiz();
        }}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Start;
