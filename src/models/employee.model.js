import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    employeeCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

export const Employee = mongoose.model("Employee", employeeSchema);