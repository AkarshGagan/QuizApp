import React from "react";
import { useState } from "react";
import Button from "../Button";
function Options({ data, dispatch, answer }) {
  const hasAnswered = answer !== null;
  const [clickedOption, setClicked] = useState(null);
  function handleClick(index) {
    if (!hasAnswered) {
      setClicked(index);
      dispatch({ type: "newAnswer", payload: index });
    }
  }
  return (
    <div className="options">
      {data.options.map((option, index) => (
        <Button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === data.correctOption
                ? "correct"
                : "wrong"
              : ""
          }
          ${
            hasAnswered &&
            index === clickedOption &&
            index !== data.correctOption
              ? "error"
              : ""
          }
          `}
          key={option}
          disabled={hasAnswered}
          onClick={() => handleClick(index)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

export default Options;
