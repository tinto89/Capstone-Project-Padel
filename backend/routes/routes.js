import express from "express";
import {
  getAllFields,
  getAllUsers,
  updateField,
} from "../controllers/queries.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/fields", getAllFields);
router.put("/fields/:id", updateField);

export { router };
