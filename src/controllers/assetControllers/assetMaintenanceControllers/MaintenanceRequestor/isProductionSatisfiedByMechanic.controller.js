import { apiError, apiResponse, Asset, asyncHandler } from "../../../allImports.js";

const isProductionSatisfiedByMechanic = asyncHandler(async (request, response) => {
    const {isProductionSatisfiedByMechanic} = request.body;
    const {assetId} = request.params;

    if(!isProductionSatisfiedByMechanic){
        throw new apiError(400, "Please select the appropriate option")
    }

    if(!assetId){
        throw new apiError(400, "Asset ID not found")
    }

    const foundAsset = await Asset.findById(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset not found, may be deleted")
    }

    let status = false;

    if(isProductionSatisfiedByMechanic === "Yes"){
        status = true;
    }

    foundAsset.isProductionSatisfiedByMechanic = status;
    if(status){
        foundAsset.isProductionSatisfiedPopupVisible = false;
    }
    await foundAsset.save({validateBeforeSave: false});

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Status updated")
    )

});

export {isProductionSatisfiedByMechanic}