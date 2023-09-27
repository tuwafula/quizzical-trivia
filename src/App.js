import React from "react";

import Start from "./components/Start";
import "./App.css";
import Questions from "./components/Questions";
import blob from "./components/images/blob.png";

const App = () => {
  const [questions, setQuestions] = React.useState([]);
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [showStart, setShowStart] = React.useState(true);
  const [allComplete, setAllComplete] = React.useState(false);
  const [score, setScore] = React.useState(0);

  function startQuiz() {
    setShowStart(false);
  }

  function playAgain() {
    setShowAnswers(false);
    setScore(0);
    setShowStart(true);
    setAllComplete(false);
  }

  React.useEffect(() => {
    if (showStart === false) {
      fetch("https://opentdb.com/api.php?amount=5")
        .then((res) => res.json())
        .then((data) =>
          setQuestions(
            data.results.map((question) => {
              return {
                question: question.question,
                options: question.incorrect_answers
                  .concat([question.correct_answer])
                  .sort(() => Math.random() - 0.5),
                selected_answer: undefined,
                correct_answer: question.correct_answer,
              };
            })
          )
        );
    }
  }, [showStart]);

  function checkAnswers() {
    setShowAnswers(true);
  }

  function selectAnswer(quest_id, option_id) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((quest, qid) => {
        if (quest_id === qid) {
          return { ...quest, selected_answer: option_id };
        } else {
          return quest;
        }
      });
    });
  }

  React.useEffect(() => {
    setAllComplete(
      questions.every((quest) => typeof quest.selected_answer !== "undefined")
    );
  }, [questions]);

  React.useEffect(() => {
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
      if (typeof questions[i].selected_answer !== "undefined") {
        if (
          questions[i].options[questions[i].selected_answer] ===
          questions[i].correct_answer
        ) {
          count++;
        }
      }
    }
    setScore(count);
  }, [showAnswers]);

  const quests = questions.map(function (question, index) {
    return (
      <Questions
        key={index}
        question={question}
        selectAnswer={selectAnswer}
        showAnswers={showAnswers}
        id={index}
      />
    );
  });

  return (
    <div>
      {showStart ? (
        <Start startQuiz={startQuiz} />
      ) : (
        <div className="question--container">
          {quests}
          {showAnswers ? (
            <div className="button-container">
              <h3 className="button-container-score">
                {`You scored ${score}/5 correct answers`}
              </h3>
              <button
                className="button"
                onClick={() => {
                  playAgain();
                }}
              >
                Play Again
              </button>
            </div>
          ) : (
            <button
              className="button"
              onClick={() => {
                checkAnswers();
              }}
              disabled={!allComplete}
            >
              Check Answers
            </button>
          )}
        </div>
      )}
      <img className="blob1" src={blob} alt="blob1" />
      <img className="blob2" src={blob} alt="blob2" />
    </div>
  );
};

export default App;
