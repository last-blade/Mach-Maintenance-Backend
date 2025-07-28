import { apiError, apiResponse, Asset, AssetMaintenance, AssetMaintenanceRequest, asyncHandler, MaintenanceAcknowledgment } from "../../../allImports.js";

const updateAssetMaintenanceStatus = asyncHandler(async (request, response) => {
    const {assetId, status, remark, comment, assetSpareId} = request.body;

    if(!assetId){
        throw new apiError(400, "Asset ID is required")
    }
    
    if(!status){
        throw new apiError(400, "Status is required")
    }

    if(!remark){
        throw new apiError(400, "Remark is required")
    }

    const foundCorrespondingMaintenance = await AssetMaintenance.findOne({
        isActive: true,
        assetId,
    });

    const createAssetMaintenanceAcknowledgement = await MaintenanceAcknowledgment.create({
        assetId,
        status,
        remark,
        comment,
        maintenanceId: foundCorrespondingMaintenance._id,
        acknowledgementCreator: request.user.id,
        assetSpareId: assetSpareId || null,
    });

    foundCorrespondingMaintenance.acknowledgementId = createAssetMaintenanceAcknowledgement;
    await foundCorrespondingMaintenance.save({validateBeforeSave: false});

    // if(status === "Completed"){
    //     await Asset.findByIdAndUpdate(assetId, {
    //         $set: {
    //             underMaintenance: false,
    //         }
    //     });

    //     const assetHavingAssignedMechanic = await AssetMaintenance.find({
    //         assetId,
    //         isActive: true,
    //     }).sort({createdAt: -1});

    //     await AssetMaintenance.findOneAndUpdate({
    //         maintenanceId: assetHavingAssignedMechanic.maintenanceId,
    //         isActive: false,
    //     });

    //     await AssetMaintenanceRequest.findOneAndUpdate({
    //         assetMaintenanceRequestId: maintenanceRequestId,
    //         isActive: false,
    //     });
    // }

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Acknowledgement sent to supervisor")
    )
});

export {updateAssetMaintenanceStatus}