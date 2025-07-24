import mongoose from "mongoose";
import {
  apiResponse,
  AssetCategory,
  asyncHandler,
} from "../../allImports.js";

const fetchAssetCategories = asyncHandler(async (request, response) => {
  const categories = await AssetCategory.aggregate([
    {
      $match: {
        assetCategoryCreator: new mongoose.Types.ObjectId(request.user.id),
      },
    },

    {
      $sort: {
        assetCategory: 1,
      },
    },

    {
      $project: { __v: 0, assetCategoryCreator: 0 },
    },
  ]);

  if (categories.length === 0) {
    return response.status(200)
    .json(
      new apiResponse(200, {}, "No asset category found")
    );
  }

  return response
    .status(200)
    .json(new apiResponse(200, categories, "Asset categories fetched"));
});

export { fetchAssetCategories };
