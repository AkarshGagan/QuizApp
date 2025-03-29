import React from "react";
import { useEffect } from "react";

function StartTimer({ dispatch, seconds }) {
  const min = Math.floor(seconds / 60);
  const second = seconds % 60;
  useEffect(
    function () {
      const timer = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(timer);
    },
    [dispatch]
  );

  return (
    <div className="Timer">
      <button className="btn">
        {min < 10 && "0"}
        {min}:{second < 10 && "0"}
        {second}
      </button>
    </div>
  );
}

export default StartTimer;
