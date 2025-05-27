import express from "express";
import { getAllFood, updateFood } from "../controller/Food.js";

const router = express.Router();

router.get("/api/foodData", getAllFood);
router.put("/api/updateFood", updateFood);

export default router;
