import React from "react";
import "./Question.css";

const Questions = (props) => {
  const optionsArr = props.question.options.map((option, selectOption) => (
    <button
      className="question--option"
      onClick={() => props.selectAnswer(props.id, selectOption)}
      dangerouslySetInnerHTML={{ __html: option }}
      style={stylerFunction(option, selectOption)}
      disabled={props.showAnswers}
    />
  ));

  function stylerFunction(option, index) {
    if (props.showAnswers === true) {
      if (props.question.correct_answer === option) {
        return { backgroundColor: "#94D7A2" };
      } else if (props.question.selected_answer === index) {
        return { backgroundColor: "#F8BCBC" };
      } else {
        return { backgroundColor: "#F5F7FB" };
      }
    } else {
      return props.question.selected_answer === index
        ? { backgroundColor: "#D6DBF5" }
        : { backgroundColor: "#F5F7FB" };
    }
  }

  return (
    <div>
      <div className="questions--container">
        <h1
          className="question--container-title"
          dangerouslySetInnerHTML={{ __html: props.question.question }}
        />
        <div className="question--options-container">{optionsArr}</div>
        <hr className="question--divider" />
      </div>
    </div>
  );
};

export default Questions;
