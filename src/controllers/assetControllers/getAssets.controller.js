import { apiResponse, Asset, asyncHandler } from "../allImports.js";

const getAssets = asyncHandler(async (request, response) => {
    const assets = await Asset.find({
        // assetCreator: request.user.id,
    }).populate("assetLocation", "locationName locationCode")
    .populate("assetBrand", "assetBrand assetBrandDescription")
    .populate("assetCategory", "assetCategory depreciationPercentage")
    .populate("assetSupplier", "assetSupplierName assetCompanyName")

    return response.status(200)
    .json(
        new apiResponse(200, assets, "Assets fetched")
    )
});

export {getAssets}