import express from "express";
import cors from "cors";
import dbConnection from "./controllers/dbConnection.js";
import { router } from "./routes/routes.js";

const server = express();
server.use(express.json());
server.use(cors());
dbConnection("padel_verona");

server.get("/", (req, res) => {
  res.send("PadelManagerBackend");
});
server.use("/api", router);

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
