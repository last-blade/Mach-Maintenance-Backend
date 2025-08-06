import { apiResponse, AssetMaintenance, asyncHandler, MaintenanceAcknowledgment } from "../../../allImports.js";

const getAcknowledgementsCorrespondingToMaintenanceId = asyncHandler(async (request, response) => {
    const acknowledgementsCorrespondingToMaintenanceId = await MaintenanceAcknowledgment.find({})
    .populate("assetSpareId maintenanceId assetId");

    return response.status(200)
    .json(
        new apiResponse(200, acknowledgementsCorrespondingToMaintenanceId, "Acknowledgements fetched")
    )
});

export {getAcknowledgementsCorrespondingToMaintenanceId}