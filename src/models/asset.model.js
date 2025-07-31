import mongoose, { Schema } from "mongoose";

const assetSchema = new Schema({
    assetCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetCategory",
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetBrand",
        required: true,
        trim: true,
    },

    assetBarcodeNo: {
        type: String,
        required: false,
        trim: true,
    },

    assetInvoiceNo: {
        type: String,
        required: false,
        trim: true,
    },

    assetPurchaseDate: {
        type: Date,
        required: false,
    },

    assetPrice: {
        type: String,
        required: false,
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
        enum: ["Working", "Idle", "Scrap", "Not Working"],
        required: true,
        trim: true,
    },

    assetSupplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetSupplier",
        required: true,
        trim: true, 
    },

    assetImage: {
        type: String,
        required: false,
    },

    assetLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },

    underMaintenance: {
        type: Boolean,
        required: false,
        default: false,
    },

    assetQrCodeUrl: {
        type: String,
        required: false,
    },

    assetCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {timestamps: true});

export const Asset = mongoose.model("Asset", assetSchema);