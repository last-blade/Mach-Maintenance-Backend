import {
  apiError,
  apiResponse,
  Asset,
  AssetMaintenanceRequest,
  asyncHandler,
} from "../../../allImports.js";

const createAssetMaintenanceRequest = asyncHandler(
  async (request, response) => {
    const { assetId } = request.params;
    const { remark, priority } = request.body;

    if (!assetId) {
      throw new apiError(400, "Asset ID is required");
    }

    if (!remark) {
      throw new apiError(400, "Remark is required");
    }

    const foundAsset = await Asset.findById(assetId);

    if (!foundAsset) {
      throw new apiError(404, "Asset does not exist");
    }

    if(foundAsset.underMaintenance){
      throw new apiError(400, "Maintenance request in queue for this asset already")
    }

    await Asset.findByIdAndUpdate(
      assetId,
      {
        $set: {
          underMaintenance: true,
          assetStatus: "Not Working",
        },
      },
      { new: true }
    );

    var model;

    if(request.user.accountType === "Admin" || request.user.accountType === "HR"){
      model = "User"
    }

    else{
      model = "Employee"
    }

    const assetMaintenanceRequest = await AssetMaintenanceRequest.create({
      remark,
      assetId,
      priority,
      assetMaintenanceRequestCreator: request.user.id,
      creatorModel: model,
    });

    return response
      .status(200)
      .json(
        new apiResponse(
          200,
          assetMaintenanceRequest,
          "Asset maintenance request created"
        )
      );
  }
);

export { createAssetMaintenanceRequest };
