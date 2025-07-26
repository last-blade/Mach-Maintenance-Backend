import mongoose from "mongoose";

export const isValidObjectId = (id) => {
  if (typeof id !== 'string') return false;
  return mongoose.Types.ObjectId.isValid(id) &&
    (new mongoose.Types.ObjectId(id)).toString() === id;
};