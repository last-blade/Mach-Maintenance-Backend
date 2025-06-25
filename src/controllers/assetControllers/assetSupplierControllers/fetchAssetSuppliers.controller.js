import mongoose from "mongoose";
import {apiError, apiResponse, AssetSupplier, asyncHandler} from "../../allImports.js";

const fetchAssetSuppliers = asyncHandler(async (request, response) => {
  const categories = await AssetSupplier.aggregate([
    {
      $match: {
        assetSupplierCreator: new mongoose.Types.ObjectId(request.user.id),
      },
    },

    {
      $sort: {
        assetSupplierName: 1,
      },
    },

    {
      $project: { __v: 0, assetSupplierCreator: 0 },
    },
  ]);

  if (categories.length === 0) {
    throw new apiError(404, "No asset supplier found");
  }

  return response
    .status(200)
    .json(new apiResponse(200, categories, "Asset categories fetched"));
});

export { fetchAssetSuppliers };
