import { isValidObjectId } from "../../../../utils/isValidObjectId.js";
import { apiError, apiResponse, Asset, asyncHandler, MaintenanceAcknowledgment } from "../../../allImports.js";

const getAllAcknowledgementsOfParticularAsset = asyncHandler(async (request, response) => {

    const {assetId} = request.params;

    if(!isValidObjectId(assetId)){
        throw new apiError(400, "Invalid asset ID")
    }

    const foundAsset = await Asset.findById(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset not found")
    }

    const acknowledgementsOfAsset = await MaintenanceAcknowledgment.find({
        assetId
    }).populate("assetSpareId maintenanceId").sort({createdAt: -1});

    return response.status(200)
    .json(
        new apiResponse(200, acknowledgementsOfAsset, "Fetched all acknowledgements of asset")
    )
});

export {getAllAcknowledgementsOfParticularAsset}