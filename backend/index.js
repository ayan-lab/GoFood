import foodRoutes from "./Routes/Food.js";
import getfoodRoutes from "./Routes/Display.js";
import userRoutes from "./Routes/User.js";
import cors from "cors";

import express from "express";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT;

app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true, 
  }
));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const Connect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb Connected !!");
  } catch (error) {
    console.error("cannot connect to mongodb !!", error);
  }
};

//middlewares
app.use(foodRoutes);
app.use(getfoodRoutes);
app.use(userRoutes);

app.get("/api/food", (req, res) => {
  res.send("Food route is working!");
});

app.get("/", (req, res) => {
  res.send("you are live");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  Connect();
});




