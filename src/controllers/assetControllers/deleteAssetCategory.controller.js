import { apiError, apiResponse, AssetCategory, asyncHandler } from "../allImports.js";

const deleteAssetCategory = asyncHandler(async (request, response) => {
    const {assetCategoryId} = request.params;

    if(!assetCategoryId){
        throw new apiError(404, "Asset category ID not found")
    }

    const foundAssetCategory = await AssetCategory.findById(assetCategoryId);

    if(!foundAssetCategory){
        throw new apiError(404, "Asset category not found or may be deleted")
    }

    await AssetCategory.findByIdAndDelete(assetCategoryId);

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Asset category deleted")
    )

});

export {deleteAssetCategory}