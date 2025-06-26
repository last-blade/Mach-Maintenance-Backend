import mongoose, { Schema } from "mongoose";

const assetSpareSchema = new Schema({
    assetSpare: {
        type: String,
        required: true,
        trim: true,
    },

    assetCategory: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "AssetCategory",
        required: true,
        trim: true,
    },

    assetSpecialSpare: {
        type: Boolean,
        default: false,
        required: true,
    },

    assetSpareCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

export const AssetSpare = mongoose.model("AssetSpare", assetSpareSchema);