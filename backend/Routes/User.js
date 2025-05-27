import express from "express";
import { createUser, loginUser } from "../controller/User.js";

const router = express.Router();

router.post("/api/register", createUser);
router.post("/api/login", loginUser);

export default router;
