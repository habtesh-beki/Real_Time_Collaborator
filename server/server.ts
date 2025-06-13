import express from "express";
import http from "http";
import { Server } from "socket.io";
import { SOCKET_TYPE } from "./types";
import { auth } from "./lib/auth";
import LoginRoute from "./routes/login.route";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
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
  console.log("socket connected with the id:", socket.id);
  socket.on(
    "join-room",
    (
      {
        roomID,
        username,
      }: { roomID: String; username: String; unkownUser: Boolean },
      callback: any
    ) => {
      if (!roomID || !username) {
        if (callback) callback("Room ID and username are required");
        return;
      }
      console.log(roomID, username);
      const userAlreadyExist = roomsAsAgust.some(
        (user) => user.username === username && user.roomID === roomID
      );

      if (userAlreadyExist) {
        if (callback) callback("User already exists in this room");
        socket.emit(SOCKET_TYPE.USER_EXIST, "User already exists");
        return;
      }

      const newUser = {
        roomID,
        username,
        typing: false,
        socketId: socket.id,
        cursorPosition: 0,
      };

      roomsAsAgust.push(newUser);
      socket.join(roomID);
      socket.to(roomID).emit(SOCKET_TYPE.JOIN_SUCCESS, {
        username,
        totalUsers: roomsAsAgust.filter((u) => u.roomID === roomID).length,
      });
    }
  );

  socket.on(SOCKET_TYPE.UPDATED_CODE, (newCode: string) => {
    const roomId = findRoomById(socket.id);
    console.log(newCode);
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

app.use(LoginRoute);
app.all("/api/auth/{*any}", toNodeHandler(auth));

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
