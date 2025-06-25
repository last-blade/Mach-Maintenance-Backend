import mongoose, { Schema } from "mongoose";

const assetSchema = new Schema({
    assetCategory: {
        type: String,
        required: true,
        trim: true,
    },
    assetModelNo: {
        type: String,
        required: true,
        trim: true,
    },
    assetName: {
        type: String,
        required: true,
        trim: true,
    },
    assetCode: {
        type: String,
        required: true,
        trim: true,
    },
    assetBrand: {
        type: String,
        required: true,
        trim: true,
    },

    barcodeNo: {
        type: String,
        required: false,
        trim: true,
    },

    invoiceNo: {
        type: String,
        required: false,
        trim: true,
    },

    purchaseDate: {
        type: Date,
        required: true,
    },

    price: {
        type: String,
        required: true,
        trim: true,
    },

    specialAsset: {
        type: String,
        enum: ["Yes", "No"],
        required: true,
        trim: true,
    },

    assetStatus: {
        type: String,
        required: true,
        trim: true,
    },

    supplier: {
        type: String,
        required: true,
        trim: true, 
    },

    assetImage: {
        type: String,
        required: false,
    },

    assetLocation: {
        type: String,
        required: true,
    },

    assetCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {timestamps: true});

export const Asset = mongoose.model("Asset", assetSchema);