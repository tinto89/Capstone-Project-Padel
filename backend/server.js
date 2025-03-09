import express from "express";
import cors from "cors";
import dbConnection from "./controllers/dbConnection.js";
import { router } from "./routes/routes.js";

const server = express();
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("PadelManagerBackend on Vercel 🚀");
});

server.post("/api/db", async (req, res) => {
  console.log("Avviata la connessione al database");
  const { dbName } = req.body;
  try {
    await dbConnection(dbName);
  } catch (error) {
    console.error("Errore nella connessione al database:", error);
    res.status(500).send({ error: "Errore nella connessione al database" });
  }
});

server.use("/api", router);

export default server;
