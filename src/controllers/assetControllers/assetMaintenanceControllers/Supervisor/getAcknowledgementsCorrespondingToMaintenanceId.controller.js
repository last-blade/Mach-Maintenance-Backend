import { apiResponse, AssetMaintenance, asyncHandler } from "../../../allImports.js";

const getAcknowledgementsCorrespondingToMaintenanceId = asyncHandler(async (request, response) => {
    const acknowledgementsCorrespondingToMaintenanceId = await AssetMaintenance.find({})
    .populate("acknowledgementId assetMaintenanceRequestId assetId");

    return response.status(200)
    .json(
        new apiResponse(200, acknowledgementsCorrespondingToMaintenanceId, "Acknowledgements fetched")
    )
});

export {getAcknowledgementsCorrespondingToMaintenanceId}