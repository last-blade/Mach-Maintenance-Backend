import mongoose from "mongoose";
import { apiResponse, AssetSpare, asyncHandler } from "../../allImports.js";

const fetchAssetSpare = asyncHandler(async (request, response) => {
    const spares = await AssetSpare.aggregate([
    // {
    //   $match: {
    //     assetSpareCreator: new mongoose.Types.ObjectId(request.user.id),
    //   },
    // },

    {
      $lookup: {
        from: "assetcategories",
        localField: "assetSpareCategory",
        foreignField: "_id",
        as: "assetSpareCategory"
      }
    },

    {
      $unwind: "$assetSpareCategory",
    },

    {
      $project: {
        _id: 1,
        assetSpareName: 1,
        isAssetSpecialSpare: 1,
        createdAt: 1,
        updatedAt: 1,
        "assetSpareCategory.assetCategory": 1,
      },
    },

    {
      $sort: {
        assetSpareName: 1,
      },
    },

    {
      $project: { __v: 0, assetSpareCreator: 0 },
    },
  ]);

  if (spares.length === 0) {
    return response.status(200)
    .json(
      new apiResponse(200, {}, "No asset spare found")
    );
  }

  return response
    .status(200)
    .json(new apiResponse(200, spares, "Asset spares fetched"));
});

export {fetchAssetSpare}