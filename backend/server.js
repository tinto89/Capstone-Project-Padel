import express from "express";
import cors from "cors";
import dbConnection from "./controllers/dbConnection.js";
import { router } from "./routes/routes.js";

const server = express();
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("PadelManagerBackend");
});

server.post("/api/db", async (req, res) => {
  const { dbName } = req.body;
  try {
    await dbConnection(dbName);
  } catch (error) {
    console.error("Errore nella connessione al database:", error);
    res.status(500).send({ error: "Errore nella connessione al database" });
  }
});

server.use("/api", router);

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
