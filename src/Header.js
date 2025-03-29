import React from "react";
import logo from "./logo.svg";

function Header() {
  return (
    <div>
      <header className="app-header">
        <img src={logo} alt="React logo" />
        <h1>The React Quiz</h1>
      </header>
    </div>
  );
}

export default Header;
