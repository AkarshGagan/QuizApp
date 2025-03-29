import React from "react";

function Main({ children }) {
  return (
    <div className="main_cotainer">
      <div className="main_inner">{children}</div>
    </div>
  );
}

export default Main;
