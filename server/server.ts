import express from "express";
import http from "http";
import { Server } from "socket.io";
import { SOCKET_TYPE } from "./types";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
type GustType = {
  username: String;
  roomID: String;
};

const roomsAsAgust: GustType[] | never = [];

io.on(SOCKET_TYPE.CONNECT, (socket) => {
  console.log("socket connected");
  socket.on(
    SOCKET_TYPE.JOIN,
    (roomID: string, username: string, loginStates: string) => {
      if (loginStates === "gust") {
        roomsAsAgust.map((user) => {
          const alreadyUserExist = user.username == username;
          if (alreadyUserExist) {
            socket.emit(SOCKET_TYPE.USER_EXIST, "user already exist");
          }
          const newuser = {
            roomID: roomID,
            username: username,
          };
          roomsAsAgust.push(newuser);
          socket.join(roomID);
        });
      }
    }
  );

  socket.on(SOCKET_TYPE.TYPEING, (code: string) => {
    socket
      .to(roomsAsAgust.map((user) => user.roomID))
      .emit(SOCKET_TYPE.UPDATED_CODE, code);
  });
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
