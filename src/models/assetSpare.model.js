import mongoose, { Schema } from "mongoose";

const assetSpareSchema = new Schema({
    assetSpareName: {
        type: String,
        required: true,
        trim: true,
    },

    assetSpareCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetCategory",
        required: true,
        trim: true,
    },

    isAssetSpecialSpare: {
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