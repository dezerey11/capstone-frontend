import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

import "./App.css";

export const GlobalCtx = React.createContext(null);

function App() {
  const [gState, setGState] = React.useState({
    url: "https://capstone-websockets.herokuapp.com/",
    // url: "http://localhost:3000/",
    token: null,
    ready: false,
  });

  //Check if user is logged in
  React.useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    if (token) {
      setGState({ ...gState, token: token.token, ready: true });
    } else {
      setGState({ ...gState, token: null, ready: true });
    }
  }, []);

  return (
    <div className="App">
      <GlobalCtx.Provider value={{ gState, setGState }}>
        <Navbar />
        <Switch>
          <Route exact path="/login" render={(rp) => <Login {...rp} />} />
          <Route exact path="/signup" render={(rp) => <Signup {...rp} />} />
          <Route path="/" render={(rp) => <Home {...rp} />} />
        </Switch>
      </GlobalCtx.Provider>
    </div>
  );
}

export default App;
