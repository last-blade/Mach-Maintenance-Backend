import { apiError, apiResponse, Asset, asyncHandler, Location } from "../allImports.js";

const updateAssetLocation = asyncHandler(async (request, response) => {
    const {assetId} = request.params;
    const {locationId, assetStatus} = request.body;

    if(!locationId || !assetStatus || !assetId){
        throw new apiError(400, "All fields are required")
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
            assetStatus,
        }
    }, {new: true}).populate("assetLocation", "locationName locationCode").select("-assetCreator -__v");

    return response.status(200)
    .json(
        new apiResponse(200, updatedAssetLocation, "Asset transfered")
    )

});

export {updateAssetLocation}