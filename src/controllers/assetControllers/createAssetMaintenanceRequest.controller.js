import { apiError, apiResponse, Asset, AssetMaintenanceRequest, asyncHandler } from "../allImports.js";

const createAssetMaintenanceRequest = asyncHandler(async (request, response) => {
    const {assetId} = request.params;
    const {remark} = request.body;
    console.log(request.user)

    if(!assetId){
        throw new apiError(400, "Asset ID is required")
    }

    if(!remark){
        throw new apiError(400, "Remark is required")
    }

    const foundAsset = await Asset.findById(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset does not exist")
    }

    await Asset.findByIdAndUpdate(assetId, {
        $set: {
            underMaintenance: true,
        }
    }, {new: true});

    const assetMaintenanceRequest = await AssetMaintenanceRequest.create({
        remark,
        assetId,
        assetMaintenanceRequestCreator: request.user.id,
        creatorModel: request.user.accountType === "Admin" || "HR" ? "User" : "Employee",
    });
    

    return response.status(200).json(
        new apiResponse(200, assetMaintenanceRequest, "Asset maintenance request created")
    )

});

export {createAssetMaintenanceRequest}