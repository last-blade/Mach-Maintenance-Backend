import mongoose, { Schema } from "mongoose";

const assetSupplierSchema = new Schema({
    assetSupplierName: {
        type: String,
        trim: true,
        required: true,
    },
    assetCompanyName: {
        type: String,
        trim: true,
        required: true,
    },

    assetType: {
        type: String,
        enum: ["Supplier", "Vendor"],
        trim: true,
        required: true,
    },
    assetSupplierPhone: {
        type: Number,
        trim: true,
        required: false,
    },

    assetSupplierPhone: {
        type: Number,
        trim: true,
        required: false,
    },

    assetSupplierCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

}, {timestamps: true});

export const AssetSupplier = mongoose.model("AssetSupplier", assetSupplierSchema);