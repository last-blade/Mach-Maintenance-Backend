import mongoose, { Schema } from "mongoose";

const assetMaintenanceSchema = new Schema({

    maintenanceId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    mechanic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
    }

}, {timestamps: true});

assetMaintenanceSchema.pre("save", async function(next){
    if(this.maintenanceId){
        this.maintenanceId = "MNTC" + this._id
    }

    next();
})

export const AssetMaintenance = mongoose.model("AssetMaintenance", assetMaintenanceSchema);