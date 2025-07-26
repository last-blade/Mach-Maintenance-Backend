import mongoose from "mongoose";
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
    const { assetId, mechanicId, remarks } = request.body;

    if (
      [assetId, mechanicId, remarks].some(
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

    if (foundAssetUnderMaintenance) {
      throw new apiError(400, "Asset already in maintenance");
    }

    const createdMaintenance = await AssetMaintenance.create({
      remarks,
      mechanic: mechanicId,
      assetId,
    });

    await Asset.findByIdAndUpdate(
      assetId,
      {
        underMaintenance: true,
      },
      { new: true }
    );

    return response
      .status(201)
      .json(
        new apiResponse(
          201,
          createdMaintenance,
          `${foundAsset.assetName} is under maintenance`
        )
      );
  }
);

export { assignAssetMaintenanceMechanic };
