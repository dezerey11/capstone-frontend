import React from "react";
import { Link } from "react-router-dom";
import { GlobalCtx } from "../App";
import "./navbar.css";

const Navbar = () => {
  const { gState } = React.useContext(GlobalCtx);

  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  if (gState.token) {
    return (
      <div className="navbar">
        <h1>Chat App</h1>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2>Home</h2>
        </Link>
        <Link to="/" onClick={logout} style={{ textDecoration: "none" }}>
          <h2>Log Out</h2>
        </Link>
      </div>
    );
  }
  return (
    <div className="navbar">
      <h1>Chat App</h1>
    </div>
  );
};

export default Navbar;
