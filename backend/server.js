import express from "express";
import cors from "cors";
import dbConnection from "./controllers/dbConnection.js";
import { router } from "./routes/routes.js";
import { createServer } from "@vercel/node"; // per la backend serverless su Vercel

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("PadelManagerBackend on Vercel 🚀");
});

app.post("/api/db", async (req, res) => {
  const { dbName } = req.body;
  try {
    await dbConnection(dbName);
  } catch (error) {
    console.error("Errore nella connessione al database:", error);
    res.status(500).send({ error: "Errore nella connessione al database" });
  }
});

app.use("/api", router);

export default createServer(app);
