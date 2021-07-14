import React from "react";
import { Link } from "react-router-dom";
import { GlobalCtx } from "../App";

const Signup = (props) => {
  const { gState } = React.useContext(GlobalCtx);
  const { url } = gState;

  const blank = {
    username: "",
    password: "",
  };

  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = form;

    fetch(`${url}auth/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setForm(blank);
        props.history.push("/login");
      });
  };

  return (
    <div>
      <h1 className="page-title">Sign Up</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <h3>Username</h3>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <h3>Password</h3>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" name="signup" value="Sign Up" className="button" />
      </form>
      <br />
      <Link to="login">
        <button role="link" className="button">
          Return to Log In
        </button>
      </Link>
    </div>
  );
};

export default Signup;
