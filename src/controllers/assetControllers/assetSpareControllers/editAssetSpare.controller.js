import { apiError, apiResponse, AssetSpare, asyncHandler } from "../../allImports.js";

const editAssetSpare = asyncHandler(async (request, response) => {
    const {assetSpareId} = request.params;
    const {assetSpareName, assetSpareCategory, isAssetSpecialSpare} = request.body;

    if(!assetSpareId){
        throw new apiError(404, "Asset spare ID not found")
    }

    const foundAssetSpare = await AssetSpare.findById(assetSpareId);

    if(!foundAssetSpare){
        throw new apiError(404, "Asset spare not found maybe deleted")
    }

    const updatedAssetSpare = await AssetSpare.findByIdAndUpdate(assetSpareId, {
        $set: {
            assetSpareName, 
            assetSpareCategory, 
            isAssetSpecialSpare
        }
    }, {new: true});

    return response.status(200)
    .json(
        new apiResponse(200, updatedAssetSpare, "Asset spare deleted")
    )

});

export {editAssetSpare}