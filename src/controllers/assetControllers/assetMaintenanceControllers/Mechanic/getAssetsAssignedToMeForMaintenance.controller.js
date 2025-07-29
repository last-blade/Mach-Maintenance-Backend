import { apiResponse, Asset, AssetMaintenance, asyncHandler } from "../../../allImports.js";

const getAssetsAssignedToMeForMaintenance = asyncHandler(async (request, response) => {
    const assetsAssignedToMeForMaintenance = await AssetMaintenance.find({
        mechanic: request.user.id,
    }).populate("assetId");

    if(assetsAssignedToMeForMaintenance.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, "No assets found assigned to you for maintenance")
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, assetsAssignedToMeForMaintenance, "Assets fetched assigned to you for maintenance")
    )
});

export {getAssetsAssignedToMeForMaintenance}