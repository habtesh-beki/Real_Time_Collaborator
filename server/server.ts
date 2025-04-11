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
  typing: boolean;
  socketId: string;
  cursorPosition: number;
};

const roomsAsAgust: GustType[] | never = [];

const findRoomById = (socketId: string) => {
  const Room = roomsAsAgust.find((room) => room.socketId == socketId)?.roomID;
  if (!Room) {
    throw new Error("there is no room in this id");
  }
  return Room;
};
const getUserBySocketId = (socketId: string) => {
  const User = roomsAsAgust.find((room) => (room.socketId = socketId));
  if (!User) {
    throw new Error("there is not user by in this id");
  }
  return User;
};

io.on(SOCKET_TYPE.CONNECT, (socket) => {
  console.log("socket connected");
  socket.on(SOCKET_TYPE.JOIN, (roomID: string, username: string) => {
    const userAlreadyExist = roomsAsAgust.filter((user) => {
      user.username == username;
    });

    if (userAlreadyExist) {
      socket.emit(SOCKET_TYPE.USER_EXIST, "user already exist");
    } else {
      const newUser = {
        roomID: roomID,
        username: username,
        typing: false,
        socketId: socket.id,
        cursorPosition: 0,
      };
      roomsAsAgust.push(newUser);
      socket.join(roomID);
    }
  });

  socket.on(SOCKET_TYPE.UPDATED_CODE, (newCode: string) => {
    const roomId = findRoomById(socket.id);
    socket.broadcast.to(roomId).emit(SOCKET_TYPE.UPDATED_CODE, newCode);
  });

  socket.on(SOCKET_TYPE.TYPEING, (cursorPosition: number) => {
    const roomId = findRoomById(socket.id);
    socket.to(roomId).emit(SOCKET_TYPE.CUROSR_POSITION, cursorPosition);
  });

  socket.on(SOCKET_TYPE.PAUSE, () => {
    const user = getUserBySocketId(socket.id);
    const roomId = findRoomById(socket.id);
    const newUser = { ...user, typing: false };
    roomsAsAgust.push(newUser);
    socket.to(roomId).emit(SOCKET_TYPE.PAUSE);
  });

  socket.on(SOCKET_TYPE.LEAVE, () => {
    const roomID = findRoomById(socket.id);
    socket.in(socket.io).socketsLeave(roomID);
  });
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
