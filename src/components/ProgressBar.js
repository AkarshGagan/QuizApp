import React from "react";

function ProgressBar({ index, totalquest, points, maxpoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={totalquest}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong>/{totalquest}
      </p>
      <p>
        <strong>
          {points}/{maxpoints}
        </strong>
      </p>
    </header>
  );
}

export default ProgressBar;
