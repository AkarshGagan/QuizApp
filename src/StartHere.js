import React from "react";
import Button from "./Button";

function StartHere({ length, dispatch }) {
  function handleClick() {
    dispatch({ type: "start" });
  }
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{length} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleClick}>
        Let's start
      </button>
    </div>
  );
}

export default StartHere;
