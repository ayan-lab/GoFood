import mongoose from "mongoose";
const { Schema } = mongoose;

const FoodSchema = new Schema(
  {
    CategoryName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    options: {
      type: Map,
      of : Number,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Food", FoodSchema);
