import { apiResponse, Asset, asyncHandler } from "../allImports.js";

const getAsset = asyncHandler(async (request, response) => {
    const {assetId} = request.params;

    if(!assetId){
        throw new apiError(400, "Asset ID not found")
    }

    const foundAsset = await Asset.findById(assetId).populate("assetCategory assetBrand assetSupplier assetLocation", "assetCategory assetBrand assetSupplierName assetType assetSupplierPhone assetCompanyName locationName locationCode")
    .select("-assetCreator");

    if(!foundAsset){
        throw new apiError(404, "Asset not found")
    }

    return response.status(200)
    .json(
        new apiResponse(200, foundAsset, "Asset fetched")
    )    

});

export {getAsset}