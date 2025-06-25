import mongoose, { Schema } from "mongoose";

const assetCategorySchema = new Schema({
    assetCategory: {
        type: String,
        required: true,
        trim: true,
    },

    depreciationPercentage: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },

    assetCategoryCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true});

export const AssetCategory = mongoose.model("AssetCategory", assetCategorySchema);