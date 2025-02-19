import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function dbConnection(dbName) {
  try {
    const connect = await mongoose.connect(process.env.URI + `${dbName}_pmDB`);
    console.log(`MongoDB Atlas connesso: ${connect.connection.host}`);
  } catch (error) {
    console.log("Errore nella connessione a MongoDB:", error);
  }
}
