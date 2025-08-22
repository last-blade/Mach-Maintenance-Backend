import mongoose, { Schema } from "mongoose";

const assetMaintenanceSchema = new Schema({

    maintenanceId: {
        type: String,
        required: false,
        trim: true,
        unique: true,
        index: true,
    },

    mechanic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },

    assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
        index: true,
    },

    assetMaintenanceRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaintenanceRequest",
        required: true,
    },

    acknowledgementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MaintenanceAcknowledgment",
        required: false,
    },

    isActive: {
        type: Boolean,
        required: true,
        default: true,
    }

}, {timestamps: true});

assetMaintenanceSchema.pre("save", async function(next){
    if(!this.maintenanceId){
        this.maintenanceId = "MNTC" + this._id
    }

    next();
})

export const AssetMaintenance = mongoose.model("AssetMaintenance", assetMaintenanceSchema);