import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  nome: {
    type: String,
  },
  cognome: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Users = mongoose.model("users", usersSchema);

export default Users;
