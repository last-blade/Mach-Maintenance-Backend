import { apiResponse, Asset, asyncHandler } from "../allImports.js";

const filterAssetsByStatus = asyncHandler(async (request, response) => {
    const {assetStatus} = request.body;

    const assetByStatus = await Asset.find({
        assetStatus
    });

    if(assetByStatus.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, `No Asset found for the ${assetStatus}`)
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, assetByStatus, `Assets fetched for the ${assetStatus}`)
    )
});

export {filterAssetsByStatus}