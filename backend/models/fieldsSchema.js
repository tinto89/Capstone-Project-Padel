import mongoose from "mongoose";

const fieldsSchema = new mongoose.Schema({
  nome: {
    type: String,
  },
  stato: {
    type: String,
  },
  userA1: {
    type: String,
  },
  userA2: {
    type: String,
  },
  userB1: {
    type: String,
  },
  userB2: {
    type: String,
  },

  scoreA: {
    type: Number,
  },
  scoreB: {
    type: Number,
  },
  setsA: {
    type: Number,
  },
  setsB: {
    type: Number,
  },
  gamesA: {
    type: Number,
  },
  gamesB: {
    type: Number,
  },
  advantage: {
    type: String,
  },
});

const Fields = mongoose.model("fields", fieldsSchema);

export default Fields;
