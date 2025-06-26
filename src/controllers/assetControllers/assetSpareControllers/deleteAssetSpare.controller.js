import { apiError, apiResponse, AssetSpare, asyncHandler } from "../../allImports.js";

const deleteAssetSpare = asyncHandler(async (request, response) => {
    const {assetSpareId} = request.params;

    if(!assetSpareId){
        throw new apiError(404, "Asset spare ID not found")
    }

    const foundAssetSpare = await AssetSpare.findById(assetSpareId);

    if(!foundAssetSpare){
        throw new apiError(404, "Asset spare not found maybe deleted")
    }

    await AssetSpare.findByIdAndDelete(assetSpareId);

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Asset spare deleted")
    )

});

export {deleteAssetSpare}