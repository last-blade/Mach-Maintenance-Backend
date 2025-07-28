import {
  apiError,
  apiResponse,
  Asset,
  AssetMaintenance,
  AssetMaintenanceRequest,
  asyncHandler,
  Employee,
} from "../../../allImports.js";
import { isValidObjectId } from "../../../../utils/isValidObjectId.js";

const assignAssetMaintenanceMechanic = asyncHandler(
  async (request, response) => {
    const { assetId, mechanicId } = request.body;

    if (
      [assetId, mechanicId].some(
        (inputField) => inputField === undefined || inputField.trim() === ""
      )
    ) {
      throw new apiError(400, "All fields are required");
    }

    if(!isValidObjectId(mechanicId)){
        throw new apiError(400, "Invalid mechanic ID")
    }

    const foundAsset = await Asset.findById(assetId);

    if (!foundAsset) {
      throw new apiError(404, "Asset not found");
    }

    const foundUser = await Employee.findById(mechanicId);

    if (!foundUser) {
      throw new apiError(404, "User not found");
    }

    const foundAssetUnderMaintenance = await AssetMaintenance.find({
      assetId,
      isActive: true,
    });

    if (foundAssetUnderMaintenance.length > 0) {
      throw new apiError(400, "Mechanic is already assigned");
    }

    if(!foundAsset.underMaintenance){
        throw new apiError(400, "Create a maintenance request first")
    }

    const foundRequest = await AssetMaintenanceRequest.findOne({ 
      assetId, isActive: true 
    });

    if (!foundRequest) {
      throw new apiError(404, "No maintenance request found for this asset");
    }

    const createdMaintenance = await AssetMaintenance.create({
      mechanic: mechanicId,
      assetId,
      assetMaintenanceRequestId: foundRequest._id
    });

    const foundMaintenanceRequest = await AssetMaintenanceRequest.findOne({
      isActive: true,
      assetId,
    });

    foundMaintenanceRequest.maintenanceId = createdMaintenance._id;
    await foundMaintenanceRequest.save({validateBeforeSave: false});

    return response
      .status(201)
      .json(
        new apiResponse(
          201,
          createdMaintenance,
          `Mechanic assigned to ${foundAsset.assetName}`
        )
      );
  }
);

export { assignAssetMaintenanceMechanic };
