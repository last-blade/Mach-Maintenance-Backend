import mongoose, { Schema } from "mongoose";

const assetScheduledMaintenanceSchema = new Schema({
    assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
    },

    maintenanceScheduledDate: {
        type: Date,
        required: true,
    },

    maintenanceScheduledId: {
        type: String,
        required: false,
    },

    mechanic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },

    maintenanceScheduledBy: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Employee", 
    },

}, {timestamps: true});

assetScheduledMaintenanceSchema.pre("save", function(next){
    if(!this.maintenanceScheduledId){
        this.maintenanceScheduledId = "MNTS"+this._id;
    }
    next();
});

export const AssetScheduledMaintenance = mongoose.model("AssetScheduledMaintenance", assetScheduledMaintenanceSchema);