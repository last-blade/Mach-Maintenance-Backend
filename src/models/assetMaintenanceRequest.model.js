import mongoose, { Schema } from "mongoose";

const assetMaintenanceRequestSchema = new Schema({
    assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
    },

    assetMaintenanceRequestId: {
        type: String,
        required: true,
        trim: true,
    },

    remark: {
        type: String,
        trim: true,
        required: true,
    }

}, {timestamps: true});

assetMaintenanceRequestSchema.pre("save", async function(next){
    this.assetMaintenanceRequestId = "MNTR" + this._id
    next();
})

export const AssetMaintenanceRequest = mongoose.model("AssetMaintenanceRequest", assetMaintenanceRequestSchema);