import { apiResponse, Asset, asyncHandler } from "../../allImports.js";

const getAllAssetsUnderMaintenance = asyncHandler(async (request, response) => {
    const allAssetsUnderMaintenance = await Asset.find({
        underMaintenance: true,
    }).populate("assetLocation", "locationName locationCode").populate("assetCategory", "assetCategory").select("-__v -assetCreator")

    return response.status(200)
    .json(
        new apiResponse(200, allAssetsUnderMaintenance, "Assets under maintenance fetched")
    )

});

export {getAllAssetsUnderMaintenance}