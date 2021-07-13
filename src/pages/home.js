import React, { useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalCtx } from "../App";
import "./home.css";
import socket from "../socket";

const Home = () => {
  const history = useHistory();

  const [chatMessage, setChatMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const { gState, setGState } = React.useContext(GlobalCtx);

  // if the state of token changes and the token is not ready and there
  // is no token then redirect to login
  useEffect(() => {
    if (gState.ready && !gState.token) {
      history.push("/login");
    }
  }, [gState.ready, gState.token]);

  const handleMessage = (msg) => {
    setMessages(messages.concat(msg));
  };

  // if the state of token changes and there is a token then listen for chat messages
  useEffect(() => {
    if (!gState.token) {
      return;
    }

    socket.on("chat message", handleMessage);

    // cleans up message listener by running before socket.on. This prevents running the lister funtion multiple times.
    return () => {
      socket.off("chat message", handleMessage);
    };
  }, [gState.token, messages, setMessages]);

  useLayoutEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  // if the state of token is not ready render nothing
  if (!gState.ready) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatMessage) {
      socket.emit("chat message", {
        text: chatMessage,
        token: gState.token,
      });
      setChatMessage("");
    }
  };

  const handleChange = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <div className="home">
      <ul id="messages">
        {messages.map((message, i) => (
          <li key={i}>
            <strong>{message.username}: </strong>
            {message.text}
          </li>
        ))}
      </ul>
      <form id="form" action="" onSubmit={handleSubmit}>
        <input
          id="input"
          autoComplete="off"
          onChange={handleChange}
          value={chatMessage}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Home;
