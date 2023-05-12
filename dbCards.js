import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  id: Number,
  name: String,
  url: String,
});

export default mongoose.model("cards", cardSchema)