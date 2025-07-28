import { apiResponse, AssetMaintenanceRequest, asyncHandler } from "../../../allImports.js";

const getAssetMaintenanceRequests = asyncHandler(async (request, response) => {

    var model;

    const accountType = request.user.accountType;
    
    if(accountType === "Admin" || accountType === "HR"){
        model = "User";
    }

    else{
        model = "Employee"
    }

    const assetMaintenanceRequests = await AssetMaintenanceRequest.find({
        assetMaintenanceRequestCreator: request.user.id,
        creatorModel: model,
    }).select("-assetMaintenanceRequestCreator");

    return response.status(200)
    .json(
        new apiResponse(200, assetMaintenanceRequests, "Asset maintenance requests fetched")
    )
});

export {getAssetMaintenanceRequests}