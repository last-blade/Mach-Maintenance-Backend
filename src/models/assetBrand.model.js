import mongoose, { Schema } from "mongoose";

const assetBrandSchema = new Schema({
    assetBrand: {
        type: String,
        required: true,
        trim: true,
    },

    assetBrandDescription: {
        type: String,
        required: false,
        trim: true,
        default: "NA",
    },

    assetBrandCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true});

export const AssetBrand = mongoose.model("AssetBrand", assetBrandSchema);