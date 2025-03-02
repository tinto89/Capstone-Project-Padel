import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let currentConnection = null;

export default async function dbConnection(dbName) {
  try {
    if (currentConnection) {
      await mongoose.disconnect(); // Disconnetto dal precedente database
      console.log("Connessione precedente chiusa.");
    }

    const connect = await mongoose.connect(process.env.URI + `${dbName}_pmDB`);
    currentConnection = connect.connection;
    console.log(`MongoDB Atlas connesso: ${connect.connection.host}`);
  } catch (error) {
    console.log("Errore nella connessione a MongoDB:", error);
  }
}
