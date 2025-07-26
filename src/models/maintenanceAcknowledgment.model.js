import mongoose, { mongo, Schema } from "mongoose";

const maintenanceAcknowledgmentSchema = new Schema({
    assetSpareId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetSpare",
        required: false,
    },

    status: {
        type: String,
        required: true,
        trim: true,
    },

    remark: {
        type: String,
        required: true,
        trim: true,
    },

    comment: {
        type: String,
        required: false,
        trim: true,
        default: null,
    },

    maintenanceRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaintenanceRequest",
        required: true,
    },

    acknowledgementCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },

}, {timestamps: true});

export const MaintenanceAcknowledgment = mongoose.model("MaintenanceAcknowledgment", maintenanceAcknowledgmentSchema);