import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_CHAT_SERVER, {
  path: "/socket.io/",
  withCredentials: true,
  transports: ["websocket"],
  secure: true, 
});

export default socket;
