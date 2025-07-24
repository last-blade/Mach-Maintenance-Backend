import mongoose from "mongoose";
import { apiResponse, AssetSupplier, asyncHandler} from "../../allImports.js";

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

  if (spares.length === 0) {
    return response.status(200)
    .json(
      new apiResponse(200, {}, "No asset suppliers found")
    );
  }

  return response
    .status(200)
    .json(new apiResponse(200, categories, "Asset categories fetched"));
});

export { fetchAssetSuppliers };
