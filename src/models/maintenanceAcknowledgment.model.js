import mongoose, { mongo, Schema } from "mongoose";

const maintenanceAcknowledgmentSchema = new Schema({
    acknowledgementId: {
        type: String,
        required: false,
        trim: true,
    },

    assetSpareId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetSpare",
        required: false,
    },

    status: {
        type: String,
        required: true,
        trim: true,
    },

    remark: {
        type: String,
        required: true,
        trim: true,
    },

    comment: {
        type: String,
        required: false,
        trim: true,
        default: null,
    },

    maintenanceRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaintenanceRequest",
        required: true,
    },

    acknowledgementCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },

}, {timestamps: true});

maintenanceAcknowledgmentSchema.pre("save", function(next){
    if(!this.acknowledgementId){
        this.acknowledgementId = "MNTA" + this._id;
    }

    next();
})

export const MaintenanceAcknowledgment = mongoose.model("MaintenanceAcknowledgment", maintenanceAcknowledgmentSchema);