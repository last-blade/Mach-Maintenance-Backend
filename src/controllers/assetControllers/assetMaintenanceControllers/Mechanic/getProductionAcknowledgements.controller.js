import { apiError, apiResponse, Asset, asyncHandler, ProductionAcknowledgement } from "../../../allImports.js";

const getProductionAcknowledgements = asyncHandler(async (request, response) => {
    const {assetId} = request.params;

    if(!assetId){
        throw new apiError(400, "Asset ID required")
    }

    const foundAsset = await Asset.findById(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset not found, maybe deleted")
    }

    const productionAcknowledgements = await ProductionAcknowledgement.find({
        assetId,
    }).sort({createdAt: -1});

    return response.status(200)
    .json(
        new apiResponse(200, productionAcknowledgements, "Acknowledgements fetched")
    )

});

export {getProductionAcknowledgements}