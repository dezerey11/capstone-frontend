import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");
const socket = io("https://capstone-websockets.herokuapp.com");

export default socket;
