import express from "express";
import { createFood } from "../controller/Food.js";

const router = express.Router();

router.post("/api/food", createFood);

export default router;
