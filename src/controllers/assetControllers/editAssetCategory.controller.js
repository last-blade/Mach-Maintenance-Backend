import { apiError, apiResponse, AssetCategory, asyncHandler } from "../allImports.js";

const editAssetCategory = asyncHandler(async (request, response) => {
    const {assetCategoryId} = request.params;
    const {assetCategory, depreciationPercentage} = request.body;

    if(!assetCategoryId){
        throw new apiError(404, "Asset category ID not found")
    }

    if(!assetCategory || !depreciationPercentage){
        throw new apiError(404, "All fields are required")
    }

    const updatedAssetCategory = await AssetCategory.findByIdAndUpdate(assetCategoryId, {
        $set: {
            assetCategory,
            depreciationPercentage,
        }
    }, {new: true});

    return response.status(200)
    .json(
        new apiResponse(200, updatedAssetCategory, "Asset category updated")
    )

});

export{editAssetCategory}