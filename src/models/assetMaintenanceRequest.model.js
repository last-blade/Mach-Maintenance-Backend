import mongoose, { Schema } from "mongoose";

const assetMaintenanceRequestSchema = new Schema({
    assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
    },

    assetMaintenanceRequestId: {
        type: String,
        trim: true,
        unique: true,
        default: null,
    },

    priority: {
        type: String,
        required: true,
        trim: true,
    },

    remark: {
        type: String,
        trim: true,
        required: true,
    },

    assetMaintenanceRequestCreator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    creatorModel: {
        type: String,
        enum: ["User", "Employee"],
        required: true,
    },

    maintenanceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaintenance",
        required: false,
    },

    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },

}, {timestamps: true});

assetMaintenanceRequestSchema.pre("save", async function(next){
    if (!this.assetMaintenanceRequestId) {
        this.assetMaintenanceRequestId = "MNTR" + this._id;
    }
    next();
})

export const AssetMaintenanceRequest = mongoose.model("AssetMaintenanceRequest", assetMaintenanceRequestSchema);