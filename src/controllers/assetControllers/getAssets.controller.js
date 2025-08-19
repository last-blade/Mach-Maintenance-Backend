import { apiResponse, Asset, asyncHandler } from "../allImports.js";

const getAssets = asyncHandler(async (request, response) => {

    // const page = parseInt(request.query.page) || 10;
    // const limit = parseInt(request.query.limit) || 1;
    // const skip = (page - 1) * limit;

    // const totalAssets = await Asset.countDocuments();

    const assets = await Asset.find({
        // assetCreator: request.user.id,
    }).populate("assetLocation", "locationName locationCode")
    .populate("assetBrand", "assetBrand assetBrandDescription")
    .populate("assetCategory", "assetCategory depreciationPercentage")
    .populate("assetSupplier", "assetSupplierName assetCompanyName")
    // .skip(skip).limit(limit).sort({createdAt: -1});

    return response.status(200)
    .json(
        new apiResponse(200, assets, "Assets fetched")
    )
});

export {getAssets}