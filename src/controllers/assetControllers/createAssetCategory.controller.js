import { apiError, apiResponse, AssetCategory, asyncHandler } from "../allImports.js";

const createAssetCategory = asyncHandler(async (request, response) => {
    const {assetCategory, depreciationPercentage} = request.body;

    if(!assetCategory || !depreciationPercentage){
        throw new apiError(404, "All fields are required")
    }

    const category = await AssetCategory.create({
        assetCategory,
        depreciationPercentage,
        assetCategoryCreator: request.user.id,
    });

    return response.status(201)
    .json(
        new apiResponse(201, category, "Asset category added")
    )

});

export {createAssetCategory}