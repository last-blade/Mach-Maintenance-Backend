import { apiError, apiResponse, asyncHandler, MaintenanceAcknowledgment } from "../../allImports.js";

const updateAssetMaintenanceStatus = asyncHandler(async (request, response) => {
    const {assetId, status, remark, comment, maintenanceRequestId} = request.body;

    if(!assetId){
        throw new apiError(400, "Asset ID is required")
    }
    
    if(!status){
        throw new apiError(400, "Status is required")
    }

    if(!remark){
        throw new apiError(400, "Remark is required")
    }

    const createAssetMaintenanceAcknowledgement = await MaintenanceAcknowledgment.create({
        assetId,
        status,
        remark,
        comment,
        maintenanceRequestId,
        acknowledgementCreator: request.user.id,
    });

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Acknowledgement sent to supervisor")
    )
});

export {updateAssetMaintenanceStatus}