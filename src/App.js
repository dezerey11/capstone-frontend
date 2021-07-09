import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/nav";
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
        <Route path="/" component={Nav} />

        <Switch>
          {/* <Route exact path="/" render={(rp) => <Home {...rp} />} /> */}
          <Route exact path="/home" render={(rp) => <Home {...rp} />} />
          <Route path="/login" render={(rp) => <Login {...rp} />} />
          <Route path="/signup" render={(rp) => <Signup {...rp} />} />
        </Switch>
      </GlobalCtx.Provider>
    </div>
  );
}

export default App;
