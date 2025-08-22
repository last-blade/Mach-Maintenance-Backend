import { asyncHandler, apiResponse, AssetMaintenance } from "../../../allImports.js";

const getAllAssetsTotalMaintenanceTime = asyncHandler(async (request, response) => {
    const maintenanceDocs = await AssetMaintenance.find({ isActive: false }).populate("assetId");

    if (!maintenanceDocs.length) {
        return response.status(200).json(
            new apiResponse(200, {}, "No completed maintenance found for any asset")
        );
    }

    const assetTotals = {};
    let overallMinutes = 0;

    maintenanceDocs.forEach(doc => {
        const createdAt = new Date(doc.createdAt);
        const updatedAt = new Date(doc.updatedAt);
        const diffMs = updatedAt - createdAt;
        const minutesTaken = diffMs / (1000 * 60);

        const asset = doc.assetId;
        if (!asset) return;

        if (!assetTotals[asset._id]) {
            assetTotals[asset._id] = {
                assetId: asset._id,
                assetName: asset.assetName,
                assetCode: asset.assetCode,
                assetModelNo: asset.assetModelNo,
                totalMinutes: 0,
                totalHours: 0
            };
        }

        assetTotals[asset._id].totalMinutes += minutesTaken;
        assetTotals[asset._id].totalHours = assetTotals[asset._id].totalMinutes / 60;

        overallMinutes += minutesTaken;
    });

    const responseData = {
        assets: Object.values(assetTotals).map(a => ({
            ...a,
            totalMinutes: a.totalMinutes.toFixed(2),
            totalHours: a.totalHours.toFixed(2),
        })),
        overallTotalMinutes: overallMinutes.toFixed(2),
        overallTotalHours: (overallMinutes / 60).toFixed(2),
    };

    return response.status(200).json(
        new apiResponse(200, responseData, "Total maintenance time for all assets fetched successfully")
    );
});

export { getAllAssetsTotalMaintenanceTime };
