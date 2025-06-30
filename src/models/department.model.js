import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema({
    department: {
        type: String,
        trim: true,
        required: true,
    },

    departmentCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

export const Department = mongoose.model("Department", departmentSchema);