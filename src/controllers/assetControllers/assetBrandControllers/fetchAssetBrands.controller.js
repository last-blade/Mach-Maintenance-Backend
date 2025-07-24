import mongoose from "mongoose";
import {apiResponse, AssetBrand, asyncHandler} from "../../allImports.js";

const fetchAssetBrands = asyncHandler(async (request, response) => {
  const brands = await AssetBrand.aggregate([
    {
      $match: {
        assetBrandCreator: new mongoose.Types.ObjectId(request.user.id),
      },
    },

    {
      $sort: {
        assetBrand: 1,
      },
    },

    {
      $project: { __v: 0, assetBrandCreator: 0 },
    },
  ]);

  if (spares.length === 0) {
    return response.status(200)
    .json(
      new apiResponse(200, {}, "No asset brand found")
    );
  }

  return response
    .status(200)
    .json(new apiResponse(200, brands, "Asset brands fetched"));
});

export { fetchAssetBrands };
