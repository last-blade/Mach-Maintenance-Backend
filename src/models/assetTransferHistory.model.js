import mongoose, { Schema } from "mongoose";

const assetTransferHistorySchema = new Schema({
    assetLocationChangedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    assetOldLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },

    assetNewLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },

    assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
    }, 
    
    remark: {
        type: String,
        required: true,
    },

}, {timestamps: true});

export const AssetTransferHistory = mongoose.model("AssetTransferHistory", assetTransferHistorySchema);