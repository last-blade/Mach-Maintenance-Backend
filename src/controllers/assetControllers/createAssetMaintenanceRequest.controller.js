import { apiError, apiResponse, Asset, asyncHandler } from "../allImports.js";

const createAssetMaintenanceRequest = asyncHandler(async (request, response) => {
    const {assetId} = request.params;
    const {remark} = request.body;

    if(!assetId){
        throw new apiError(400, "Asset ID is required")
    }

    if(!remark){
        throw new apiError(400, "Remark is required")
    }

    const foundAsset = await Asset(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset does not exist")
    }

    await Asset.findByIdAndUpdate(assetId, {
        $set: {
            underMaintenance: true,
            remark,
        }
    }, {new: true});

    return response.status(200).json(
        new apiResponse(200, {}, "Asset maintenance request created")
    )

});

export {createAssetMaintenanceRequest}