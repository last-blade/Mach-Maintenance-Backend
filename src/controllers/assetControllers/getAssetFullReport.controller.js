// src/controllers/assetControllers/reports/getAssetFullReport.controller.js
import mongoose from "mongoose";
import {
  apiError,
  apiResponse,
  asyncHandler,
  Asset,
  AssetMaintenanceRequest,
  AssetMaintenance,
  MaintenanceAcknowledgment,
  AssetSpare,
} from "../allImports.js";

const getAssetFullReport = asyncHandler(async (req, res) => {
  const { assetId } = req.params;

  if (!assetId || !mongoose.isValidObjectId(assetId)) {
    throw new apiError(400, "Valid assetId (param) is required");
  }

  // 1) Asset (basic details)
  const asset = await Asset.findById(assetId)
    .populate("assetCategory", "categoryName name title")
    .populate("assetBrand", "brandName name title")
    .populate("assetSupplier", "supplierName name title")
    .populate("assetLocation", "locationName name title path")
    .populate("assetCreator", "fullName email")
    .lean();

  if (!asset) throw new apiError(404, "Asset not found");

  const oid = new mongoose.Types.ObjectId(assetId);

  // Helper to normalize creator info to { _id, fullName, email }
  const normalizeCreator = (u) => {
    if (!u) return null;
    const fullName =
      u.fullName ||
      u.employeeName ||
      u.name ||
      (u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : null);
    const email = u.email || u.workEmail || u.contactEmail || null;
    return { _id: u._id, fullName, email };
  };

  /* ------------------------------------------------------------------------
   * Prefetch ALL requests for this asset & populate the creator
   * so we can attach creator info to downtime rows.
   * ---------------------------------------------------------------------- */
  const allRequests = await AssetMaintenanceRequest.find({ assetId: oid })
    .select(
      "assetMaintenanceRequestId createdAt updatedAt isActive creatorModel assetMaintenanceRequestCreator"
    )
    .populate({
      path: "assetMaintenanceRequestCreator",
      select:
        "fullName email name employeeName firstName lastName workEmail contactEmail",
    })
    .lean();

  const reqById = new Map(allRequests.map((r) => [String(r._id), r]));

  /* ----------------------- Downtime (request -> closed) -------------------- */
  const downtimeAgg = await AssetMaintenanceRequest.aggregate([
    { $match: { assetId: oid, isActive: false } },
    {
      $project: {
        _id: 1,
        createdAt: 1, // request raised
        updatedAt: 1, // request closed
        minutes: { $divide: [{ $subtract: ["$updatedAt", "$createdAt"] }, 1000 * 60] },
      },
    },
    { $addFields: { hours: { $divide: ["$minutes", 60] } } },
  ]);

  const totalDowntimeMinutes = downtimeAgg.reduce((s, r) => s + (r.minutes || 0), 0);
  const totalDowntimeHours = totalDowntimeMinutes / 60;

  // Attach creator (as "raisedBy") to per-request rows
  const timeToCloseRequests = downtimeAgg.map((r) => {
    const reqDoc = reqById.get(String(r._id));
    const raisedBy = normalizeCreator(reqDoc?.assetMaintenanceRequestCreator);
    return {
      requestId: r._id,
      minutes: +((r.minutes ?? 0).toFixed(2)),
      hours: +((r.hours ?? 0).toFixed(2)),
      raisedAt: r.createdAt,
      closedAt: r.updatedAt,
      raisedBy, // <- from assetMaintenanceRequestCreator
    };
  });

  /* --------- Maintenance time (assigned -> maintenance closed) ------------- */
  const maintenanceTimeAgg = await AssetMaintenance.aggregate([
    { $match: { assetId: oid, isActive: false } },
    {
      $project: {
        _id: 1,
        mechanic: 1,
        assetMaintenanceRequestId: 1,
        createdAt: 1, // assignment time
        updatedAt: 1, // closed time
        minutes: { $divide: [{ $subtract: ["$updatedAt", "$createdAt"] }, 1000 * 60] },
      },
    },
    { $addFields: { hours: { $divide: ["$minutes", 60] } } },
  ]);

  const totalMaintenanceMinutes = maintenanceTimeAgg.reduce(
    (s, r) => s + (r.minutes || 0),
    0
  );
  const totalMaintenanceHours = totalMaintenanceMinutes / 60;

  // For maintenance breakup, populate the nested request + its creator
  const perMaintenanceFull = await AssetMaintenance.find({ assetId })
    .populate("mechanic", "fullName department contactNumber")
    .populate({
      path: "assetMaintenanceRequestId",
      select:
        "assetMaintenanceRequestId isActive createdAt updatedAt creatorModel assetMaintenanceRequestCreator",
      populate: {
        path: "assetMaintenanceRequestCreator",
        select:
          "fullName email name employeeName firstName lastName workEmail contactEmail",
      },
    })
    .lean();

  const maintenanceBreakup = maintenanceTimeAgg.map((row) => {
    const full = perMaintenanceFull.find((x) => String(x._id) === String(row._id));
    const req = full?.assetMaintenanceRequestId;
    const raisedBy = normalizeCreator(req?.assetMaintenanceRequestCreator);

    // This object matches your requested shape and now includes the creator's name/email
    const maintenanceRequest = req
      ? {
          _id: req._id,
          assetMaintenanceRequestId: req.assetMaintenanceRequestId,
          isActive: req.isActive,
          createdAt: req.createdAt,
          updatedAt: req.updatedAt,
          raisedBy, // <- employee who raised the request (from assetMaintenanceRequestCreator)
        }
      : null;

    return {
      maintenanceId: row._id,
      minutes: +row.minutes.toFixed(2),
      hours: +row.hours.toFixed(2),
      assignedAt: row.createdAt,
      closedAt: row.updatedAt,
      mechanic: full?.mechanic || null,
      maintenanceRequest,
    };
  });

  /* ------------------------------ Spares usage ----------------------------- */
  const sparesAgg = await MaintenanceAcknowledgment.aggregate([
    { $match: { assetId: oid } },
    { $unwind: "$assetSpareId" },
    { $group: { _id: "$assetSpareId", count: { $sum: 1 } } },
    {
      $lookup: {
        from: AssetSpare.collection.name,
        localField: "_id",
        foreignField: "_id",
        as: "spare",
      },
    },
    { $unwind: "$spare" },
    {
      $project: {
        spareId: "$_id",
        count: 1,
        name: { $ifNull: ["$spare.assetSpareName", "$spare.name"] },
        _id: 0,
      },
    },
    { $sort: { count: -1, name: 1 } },
  ]);

  const sparesPerMaintenance = await MaintenanceAcknowledgment.aggregate([
    { $match: { assetId: oid } },
    { $unwind: "$assetSpareId" },
    {
      $group: {
        _id: { maintenanceId: "$maintenanceId", spareId: "$assetSpareId" },
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: AssetSpare.collection.name,
        localField: "_id.spareId",
        foreignField: "_id",
        as: "spare",
      },
    },
    { $unwind: "$spare" },
    {
      $project: {
        _id: 0,
        maintenanceId: "$_id.maintenanceId",
        spareId: "$_id.spareId",
        spareName: { $ifNull: ["$spare.assetSpareName", "$spare.name"] },
        count: 1,
      },
    },
    { $sort: { maintenanceId: 1, spareName: 1 } },
  ]);

  /* ------------------------------- Response -------------------------------- */
  const payload = {
    asset,
    metrics: {
      downtime: {
        totalMinutes: +totalDowntimeMinutes.toFixed(2),
        totalHours: +totalDowntimeHours.toFixed(2),
        perRequest: timeToCloseRequests, // each row includes { raisedBy }
      },
      maintenanceTime: {
        totalMinutes: +totalMaintenanceMinutes.toFixed(2),
        totalHours: +totalMaintenanceHours.toFixed(2),
        perMaintenance: maintenanceBreakup, // each row includes maintenanceRequest.raisedBy
      },
    },
    spares: {
      bySpare: sparesAgg,
      byMaintenance: sparesPerMaintenance,
    },
  };

  return res
    .status(200)
    .json(new apiResponse(200, payload, "Asset full report fetched successfully"));
});

export { getAssetFullReport };
