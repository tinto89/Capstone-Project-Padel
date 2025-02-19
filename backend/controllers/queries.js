import Fields from "../models/FieldsSchema.js";
import Users from "../models/usersSchema.js";

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
  getAllFields,
  getField,
  addUser,
  deleteUser,
  getAllUsers,
  updateField,
};
