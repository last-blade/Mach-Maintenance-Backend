import { apiError, apiResponse, Asset, AssetTransferHistory, asyncHandler } from "../allImports.js";

const getAssetTransferHistory = asyncHandler(async (request, response) => {
    const {assetId} = request.params;

    if(!assetId){
        throw new apiError(404, "Asset ID not found")
    }

    const foundAsset = await Asset.findById(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset not found")
    }

    // const assetHistories = foundAsset.assetTransferHistory;

    const assetHistory = await AssetTransferHistory.find({
        assetId,
    }).populate("assetLocationChangedBy assetOldLocation assetNewLocation", "fullName locationName locationCode locationName locationCode")

    return response.status(200)
    .json(
        new apiResponse(200, assetHistory, "Asset transfer history fetched")
    )

});

export {getAssetTransferHistory}