import { apiError, apiResponse, AssetSpare, asyncHandler } from "../../allImports.js";

const fetchAssetSpare = asyncHandler(async (request, response) => {
    const spares = await AssetSpare.aggregate([
    {
      $match: {
        assetSpareCreator: new mongoose.Types.ObjectId(request.user.id),
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
    throw new apiError(404, "No asset spares found");
  }

  return response
    .status(200)
    .json(new apiResponse(200, spares, "Asset spares fetched"));
});

export {fetchAssetSpare}