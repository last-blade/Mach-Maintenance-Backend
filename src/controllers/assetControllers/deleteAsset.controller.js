import { apiError, apiResponse, Asset, asyncHandler } from "../allImports.js";

const deleteAsset = asyncHandler(async (request, response) => {
    const {assetId} = request.params;

    if(!assetId){
        throw new apiError(400, "Asset ID not found")
    }

    const foundAsset = await Asset.findById(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset not found")
    }

    await Asset.findByIdAndDelete(assetId);

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Asset deleted")
    )

});

export {deleteAsset}