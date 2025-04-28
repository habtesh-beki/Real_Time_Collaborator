// server/routes/authRoutes.js
import express from "express";
import { authHandler } from "../controller/login.controller";

const router = express.Router();

router.use("/auth", (req, res) => authHandler(req, res));

export default router;
