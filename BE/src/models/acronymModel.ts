import mongoose from "mongoose";

const acronymSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  acronym: { type: String, required: true },
  definition: { type: String, required: true },
});

const Acronym = mongoose.model("Acronym", acronymSchema);

export default Acronym;
