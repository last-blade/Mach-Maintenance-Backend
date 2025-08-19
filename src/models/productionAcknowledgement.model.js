import mongoose, { Schema } from "mongoose";

const productionAcknowledgementSchema = new Schema({

    acknowledgement: {
        type: String,
        required: true,
        trim: true,
    },

    assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
    },

    maintenanceAcknowledgementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MaintenanceAcknowledgment",
        required: true,
    },

    productionAcknowledgementCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    }
}, {timestamps: true});

export const ProductionAcknowledgement = mongoose.model("ProductionAcknowledgement", productionAcknowledgementSchema);