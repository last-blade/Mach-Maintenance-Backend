import mongoose from "mongoose";
import { apiResponse, AssetMaintenanceRequest, asyncHandler } from "../../../allImports.js";

const getAssetDowntime = asyncHandler(async (req, res) => {
  const { assetId } = req.params; // make this optional if you want "all"
  const match = { isActive: false };

  if (assetId) {
    match.assetId = new mongoose.Types.ObjectId(assetId);
  }

  const rows = await AssetMaintenanceRequest.aggregate([
    { $match: match },
    {
      $project: {
        assetId: 1,
        createdAt: 1,
        updatedAt: 1,
        minutes: {
          $divide: [{ $subtract: ["$updatedAt", "$createdAt"] }, 1000 * 60],
        },
      },
    },
    { $group: { _id: "$assetId", totalMinutes: { $sum: "$minutes" } } },
    {
      $lookup: {
        from: "assets",
        localField: "_id",
        foreignField: "_id",
        as: "asset",
      },
    },
    { $unwind: "$asset" },
    {
      $project: {
        _id: 0,
        assetId: "$asset._id",
        assetName: "$asset.assetName",
        assetCode: "$asset.assetCode",
        assetModelNo: "$asset.assetModelNo",
        totalMinutes: { $round: ["$totalMinutes", 2] },
        totalHours: { $round: [{ $divide: ["$totalMinutes", 60] }, 2] },
      },
    },
  ]);

  if (!rows.length) {
    const msg = assetId ? "No maintenance found for this asset" : "No maintenance found";
    return res.status(200).json(new apiResponse(200, {}, msg));
  }

  const overallTotalMinutes = rows.reduce((s, r) => s + r.totalMinutes, 0);
  const payload = {
    assets: rows,
    overallTotalMinutes: overallTotalMinutes.toFixed(2),
    overallTotalHours: (overallTotalMinutes / 60).toFixed(2),
  };

  const msg = assetId
    ? "Total downtime for asset fetched successfully"
    : "Total downtime for all assets fetched successfully";

  return res.status(200).json(new apiResponse(200, payload, msg));
});

export { getAssetDowntime };
