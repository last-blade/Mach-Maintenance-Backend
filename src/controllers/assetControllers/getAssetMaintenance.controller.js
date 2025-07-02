import { apiError, apiResponse, Asset, AssetMaintenance, asyncHandler } from "../allImports.js";

const getAssetMaintenance = asyncHandler(async (request, response) => {
    const {assetId} = request.params;

    if(!assetId){
        throw new apiError(400, "Asset ID not found")
    }

    const foundAsset = await Asset.findById(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset not found")
    }

    const foundMaintenances = await AssetMaintenance.find({
        assetId,
    }).populate("mechanic assetId", "fullName department contactNumber assetName assetCode underMaintenance");

    return response.status(200)
    .json(
        new apiResponse(200, foundMaintenances, "Asset maintenances fetched")
    )

});

export {getAssetMaintenance}