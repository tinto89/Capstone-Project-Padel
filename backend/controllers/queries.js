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

const getAllUsers = async (req, res, next) => {
  try {
    const returnAll = await Users.find();

    res.json(returnAll);
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

export { getAllFields, getAllUsers, updateField };
