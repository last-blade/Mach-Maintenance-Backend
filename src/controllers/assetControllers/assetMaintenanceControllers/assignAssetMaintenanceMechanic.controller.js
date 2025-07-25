import {
  apiError,
  apiResponse,
  Asset,
  AssetMaintenance,
  asyncHandler,
  User,
} from "../../allImports.js";
import { isValidObjectId } from "../../../utils/isValidObjectId.js";

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

    const foundUser = await User.findById(mechanicId);

    if (!foundUser) {
      throw new apiError(404, "User not found");
    }

    const foundAssetUnderMaintenance = await AssetMaintenance.find({
      assetId,
    });

    if (foundAssetUnderMaintenance.length > 0) {
      throw new apiError(400, "Mechanic is already assigned");
    }

    if(!foundAsset.underMaintenance){
        throw new apiError(400, "Create a maintenance request first")
    }

    const createdMaintenance = await AssetMaintenance.create({
      mechanic: mechanicId,
      assetId,
    });

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
