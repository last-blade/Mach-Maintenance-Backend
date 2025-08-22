import { isValidObjectId } from "../../../../utils/isValidObjectId.js";
import { apiError, apiResponse, Asset, asyncHandler, ProductionAcknowledgement } from "../../../allImports.js";

const isProductionSatisfiedByMechanic = asyncHandler(async (request, response) => {
    const {isProductionSatisfiedByMechanic, acknowledgement, maintenanceId} = request.body;
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

    if(isProductionSatisfiedByMechanic === "No"){
        if(!isValidObjectId(maintenanceId)){
            throw new apiError(400, "Maintenance ID is invalid")
        }
        await ProductionAcknowledgement.create({
            acknowledgement,
            assetId,
            productionAcknowledgementCreator: request.user.id,
            maintenanceAcknowledgementId: maintenanceId,
        })
    }

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Status updated") 
    )

});

export {isProductionSatisfiedByMechanic}