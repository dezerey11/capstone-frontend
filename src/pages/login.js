import React from "react";
import { Link } from "react-router-dom";
import { GlobalCtx } from "../App";

const Login = (props) => {
  const { gState, setGState } = React.useContext(GlobalCtx);
  const { url } = gState;

  const blank = {
    username: "",
    password: "",
  };

  const [form, setForm] = React.useState(blank);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = form;
    fetch(`${url}auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.localStorage.setItem("token", JSON.stringify(data));
        setGState({ ...gState, token: data.token });
        setForm(blank);
        props.history.push("/");
      });
  };

  return (
    <div>
      <h1>Log In</h1>
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
        <input type="submit" value="Log In" />
      </form>
      <br />
      <Link to="signup">
        <button role="link">Sign Up</button>
      </Link>
    </div>
  );
};

export default Login;
