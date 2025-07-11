import express from "express";
import http from "http";
import { Server } from "socket.io";
import { SOCKET_TYPE } from "./types";
import { auth } from "./lib/auth";
import LoginRoute from "./routes/login.route";
import { toNodeHandler } from "better-auth/node";
// import { Configuration, OpenAIApi } from 'openai';
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";
import cors from "cors";

configDotenv();
const app = express();
const server = http.createServer(app);

app.use(express.json());

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
app.use(express.json());
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

// Store drawing states for each room
// const roomDrawingStates = new Map<string, any>();

// const genAI = new GoogleGenerativeAI(process.env.Gemini_API_KEY as string);
const ai = new GoogleGenAI({ apiKey: process.env.Gemini_API_KEY });

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

      // Send current drawing state to the new user if it exists
      // if (roomDrawingStates.has(roomID.toString())) {
      //   socket.emit(SOCKET_TYPE.DRAWING_UPDATE, roomDrawingStates.get(roomID.toString()));
      // }

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

  socket.on("excalidraw-changes", (update: any) => {
    try {
      const roomID = findRoomById(socket.id);
      console.log(update.elements);
      socket.to(roomID).emit("remote-update", update);
    } catch (error) {
      console.error("Error handling drawing update:", error);
      socket.emit(
        SOCKET_TYPE.DRAWING_ERROR,
        "Failed to process drawing update"
      );
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    try {
      const roomID = findRoomById(socket.id);
      const index = roomsAsAgust.findIndex(
        (user) => user.socketId === socket.id
      );

      if (index !== -1) {
        const user = roomsAsAgust[index];
        roomsAsAgust.splice(index, 1);

        // Notify other users in the room
        socket.to(roomID).emit(SOCKET_TYPE.JOIN_SUCCESS, {
          username: user.username,
          totalUsers: roomsAsAgust.filter((u) => u.roomID === roomID).length,
        });
      }
    } catch (error) {
      console.error("Error handling disconnection:", error);
    }
  });
});

app.use(LoginRoute);
app.post("/api/chat", async (req, res) => {
  const message = req.body.message;
  // console.log(req.body.message);
  // console.log(message);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });
    // const text = response.candidates?.text[0].content.parts[0].text;
    // const aiReply = response

    // console.log(text);
    res.json({ response });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).send("Error generating response");
  }
});
app.all("/api/auth/{*any}", toNodeHandler(auth));

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
