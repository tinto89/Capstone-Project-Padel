import express from "express";
import {
  addUser,
  deleteUser,
  getAllFields,
  getAllUsers,
  getDbName,
  getField,
  updateField,
} from "../controllers/queries.js";

const router = express.Router();

router.post("/db", getDbName);
router.get("/users", getAllUsers);
router.get("/fields", getAllFields);
router.get("/fields/:id", getField);
router.put("/fields/:id", updateField);
router.post("/users", addUser);
router.delete("/users/:id", deleteUser);

export { router };
