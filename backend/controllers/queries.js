import Fields from "../models/fieldsSchema.js";
import Users from "../models/usersSchema.js";
import dbConnection from "./dbConnection.js";

const getDbName = async (req, res, next) => {
  const { dbName } = req.body;
  try {
    console.log("Ricevuta la richiesta POST per la connessione al database");
    await dbConnection(dbName);
    console.log("Connessione al database riuscita");
    res.status(200).send("Connessione al database riuscita");
  } catch (error) {
    console.error("Errore nella connessione al database:", error);
    res.status(500).send({ error: "Errore nella connessione al database" });
    next(error);
  }
};

const getAllFields = async (req, res, next) => {
  try {
    const returnAll = await Fields.find();

    res.json(returnAll);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getField = async (req, res, next) => {
  try {
    const returnField = await Fields.findById(req.params.id);
    res.json(returnField);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const returnAll = await Users.find();

    res.json(returnAll);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateField = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    const field = await Fields.findByIdAndUpdate(req.params.id, updateData);
    res.json(field);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  getDbName,
  getAllFields,
  getField,
  addUser,
  deleteUser,
  getAllUsers,
  updateField,
};
