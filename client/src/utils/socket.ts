import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_CHAT_SERVER, {
  withCredentials: true,
});

export default socket;
