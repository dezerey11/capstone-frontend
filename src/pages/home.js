import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GlobalCtx } from "../App";

const Home = () => {
  const history = useHistory();

  const { gState, setGState } = React.useContext(GlobalCtx);

  // if the state of token changes and the token is not ready and there
  // is no token then redirect to login
  useEffect(() => {
    if (gState.ready && !gState.token) {
      history.push("/login");
    }
  }, [gState.ready, gState.token]);

  // if the state of token changes and there is a token then run getWorkouts
  useEffect(() => {
    if (gState.token) {
      history.push("/home");
    }
  }, [gState.token]);

  // if the state of token is not ready render nothing
  if (!gState.ready) {
    return null;
  }

  return (
    <div>
      <h1>Home component</h1>
    </div>
  );
};

export default Home;
