import React from "react";
import Options from "./components/Options";

function Question({ question, dispatch, answer }) {
  return (
    <div className="questions">
      <h4>{question.question}</h4>
      <Options data={question} dispatch={dispatch} answer={answer}></Options>
    </div>
  );
}

export default Question;
