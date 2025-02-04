import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function dbConnection(client) {
  try {
    const connect = await mongoose.connect(process.env.URI + `${client}_pmDB`);
    console.log(`MongoDB Atlas connesso: ${connect.connection.host}`);
  } catch (error) {
    console.log("Errore nella connessione a MongoDB:", error);
  }
}
