import { apiResponse, Asset, asyncHandler } from "../allImports.js";

const getAssets = asyncHandler(async (request, response) => {
    const assets = await Asset.find({
        assetCreator: request.user.id,
    }).populate("assetLocation", "locationName locationCode")

    return response.status(200)
    .json(
        new apiResponse(200, assets, "Assets fetched")
    )
});

export {getAssets}