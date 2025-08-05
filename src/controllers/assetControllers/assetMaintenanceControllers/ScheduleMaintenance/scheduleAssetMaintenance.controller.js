import { isValidObjectId } from "../../../../utils/isValidObjectId.js";
import { apiError, apiResponse, Asset, AssetScheduledMaintenance, asyncHandler, Employee } from "../../../allImports.js";

const scheduleAssetMaintenance = asyncHandler(async (request, response) => {
    const {assetId, maintenanceScheduledDate, mechanic} = request.body;

    if(!assetId){
        throw new apiError(400, "Asset ID is required")
    }

    if(!maintenanceScheduledDate){
        throw new apiError(400, "Maintenance schedule date is required")
    }

    if(!mechanic){
        throw new apiError(400, "Mechanic ID is required")
    }

    if(!isValidObjectId(mechanic)){
        throw new apiError(400, "Mechanic ID is invalid")
    }

    const foundAsset = await Asset.findById(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset no found for the provided asset ID")
    }

    const foundEmployee = await Employee.findById(mechanic);

    if(!foundEmployee){
        throw new apiError(404, "Employee not found")
    }

    const scheduledMaintenance = await AssetScheduledMaintenance.create({
        assetId,
        maintenanceScheduledDate,
        maintenanceScheduledBy: request.user.id,
        mechanic,
    });

    foundAsset.isUnderScheduledMaintenance = true;
    foundAsset.save({validateBeforeSave: false});
    
    return response.status(201)
    .json(
        new apiResponse(201, scheduledMaintenance, `Scheduled maintenance for ${foundAsset.assetName}`)
    )

});

export {scheduleAssetMaintenance}