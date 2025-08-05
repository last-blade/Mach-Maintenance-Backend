import { apiError, apiResponse, Asset, AssetTransferHistory, asyncHandler, Location } from "../allImports.js";

const updateAssetLocation = asyncHandler(async (request, response) => {
    const {assetId} = request.params;
    const {locationId, remark} = request.body;

    if(!assetId){
        throw new apiResponse(400, "Asset ID is required")
    }

    if(!locationId){
        throw new apiError(400, "Location Id is required")
    }

    if(!remark){
        throw new apiError(400, "Remark is required")
    }

    const foundAsset = await Asset.findById(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset not found")
    }

    const foundLocation = await Location.findById(locationId);

    if(!foundLocation){
        throw new apiError(404, "Selected location not found")
    }

    const updatedAssetLocation = await Asset.findByIdAndUpdate(assetId, {
        $set: {
            assetLocation: locationId,
        }
    }, {new: true}).populate("assetLocation", "locationName locationCode").select("-assetCreator -__v");

    await AssetTransferHistory.create({
        assetLocationChangedBy: request.user.id,
        assetOldLocation: foundAsset.assetLocation,
        assetNewLocation: locationId,
        assetId,
        remark,
    });

    return response.status(200)
    .json(
        new apiResponse(200, updatedAssetLocation, "Asset transfered")
    )

});

export {updateAssetLocation}