import express from "express";
import {
  addUser,
  deleteUser,
  getAllFields,
  getAllUsers,
  getField,
  updateField,
} from "../controllers/queries.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/fields", getAllFields);
router.get("/fields/:id", getField);
router.put("/fields/:id", updateField);
router.post("/users", addUser);
router.delete("/users/:id", deleteUser);

export { router };
