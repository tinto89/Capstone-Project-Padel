import express from "express";
import cors from "cors";
import { router } from "./routes/routes.js";
import dbConnection from "./controllers/dbConnection.js";

const server = express();
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("PadelManagerBackend on Vercel 🚀");
});

dbConnection("padel_milano");

server.use("/api", router);

export default server;
