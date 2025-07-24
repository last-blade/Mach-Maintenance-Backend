import { apiError, apiResponse, Asset, asyncHandler } from "../allImports.js";

const createAssetMaintenanceRequest = asyncHandler(async (request, response) => {
    const {assetId} = request.params;

    if(!assetId){
        throw new apiError(400, "Asset ID is required")
    }

    const foundAsset = await Asset(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset does not exist")
    }

    await Asset.findByIdAndUpdate(assetId, {
        underMaintenance: true,
    }, {new: true});

    return response.status(200).json(
        new apiResponse(200, {}, "Asset maintenance request created")
    )

});

export {createAssetMaintenanceRequest}