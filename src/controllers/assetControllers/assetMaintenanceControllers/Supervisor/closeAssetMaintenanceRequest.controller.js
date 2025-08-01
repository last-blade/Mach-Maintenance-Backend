import { apiResponse, Asset, AssetMaintenance, AssetMaintenanceRequest, asyncHandler } from "../../../allImports.js";

const closeAssetMaintenanceRequest = asyncHandler(async (request, response) => {
    const {assetId} = request.params;

    const foundAssetMaintenanceRequest = await AssetMaintenanceRequest.findOneAndUpdate({assetId: assetId, isActive: true}, {
        $set: {
            isActive: false
        }
    }, {new: true});

    const maintenanceId = foundAssetMaintenanceRequest?.maintenanceId;

    const assetInMaintenance = await AssetMaintenance.findByIdAndUpdate(maintenanceId, {
        isActive: false,
    }, {new: true});

    await Asset.findByIdAndUpdate(assetId, {
        $set: {
            underMaintenance: false,
        }
    });

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Asset maintenance appreved")
    )

}); 

export {closeAssetMaintenanceRequest}