import mongoose from "mongoose";

const acronymSchema = new mongoose.Schema({
  acronym: { type: String, required: true },
  definition: { type: String, required: true },
});

const Acronym = mongoose.model("Acronym", acronymSchema);

export default Acronym;
