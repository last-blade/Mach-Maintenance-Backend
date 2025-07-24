import mongoose from "mongoose";
import { apiResponse, AssetSupplier, asyncHandler} from "../../allImports.js";

const fetchAssetSuppliers = asyncHandler(async (request, response) => {
  const suppliers = await AssetSupplier.aggregate([
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

  if (suppliers.length === 0) {
    return response.status(200)
    .json(
      new apiResponse(200, {}, "No asset supplier found")
    );
  }

  return response
    .status(200)
    .json(new apiResponse(200, suppliers, "Asset suppliers fetched"));
});

export { fetchAssetSuppliers };
