import React from "react";
import Button from "../Button";

function NextQuestion({ dispatch, answer, index, numQuestion }) {
  function handleClick() {
    dispatch({ type: "nextQuestion" });
  }
  function handleClick2() {
    dispatch({ type: "finished" });
  }
  console.log(index);
  console.log(numQuestion);
  if (index < numQuestion - 1)
    return (
      <div className="next">
        {answer !== null && (
          <Button className="btn btn-option" onClick={handleClick}>
            Next
          </Button>
        )}
      </div>
    );
  if (index === numQuestion - 1)
    return (
      <div>
        {answer !== null && (
          <Button className="btn btn-option" onClick={handleClick2}>
            Finish
          </Button>
        )}
      </div>
    );
}

export default NextQuestion;
