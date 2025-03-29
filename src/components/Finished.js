import React from "react";
import Button from "../Button";

function Finished({ points, totalPoints, highscore, dispatch }) {
  const percentage = (points / totalPoints) * 100;
  function handleReset() {
    dispatch({ type: "reset" });
  }
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of
      <strong> {totalPoints} </strong>
      points
      <h2>Thats {Math.ceil(percentage)}%☺</h2>
      <h2>Your personal best is : {highscore}</h2>
      <Button className="btn btn-ui btn3" onClick={handleReset}>
        Restart
      </Button>
    </p>
  );
}

export default Finished;
