import express from "express";
import cors from "cors";
import dbConnection from "./controllers/dbConnection.js";

const server = express();
server.use(express.json());
server.use(cors());
dbConnection("padel_verona");

server.get("/", (req, res) => {
  res.send("PadelManagerBackend");
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
