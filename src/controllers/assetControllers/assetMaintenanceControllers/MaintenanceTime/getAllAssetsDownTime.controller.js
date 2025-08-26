import { apiResponse, AssetMaintenanceRequest, asyncHandler } from "../../../allImports.js";

const getAllAssetsDownTime = asyncHandler(async (request, response) => {
    const totalDowntimeOfAllAssets = await AssetMaintenanceRequest.find({
        isActive: false,
    }).populate("assetId");

    if (!totalDowntimeOfAllAssets.length) {
        return response.status(200).json(
            new apiResponse(200, {}, "No maintenance found for any asset")
        );
    }

    const assetTotals = {};
    let overallMinutes = 0;

    totalDowntimeOfAllAssets.forEach(assetMaintenanceRequest => {
        const createdAt = new Date(assetMaintenanceRequest.createdAt);
        const updatedAt = new Date(assetMaintenanceRequest.updatedAt);
        const diffMs = updatedAt - createdAt;
        const minutesTaken = diffMs / (1000 * 60);

        const asset = assetMaintenanceRequest.assetId;
        console.log(asset)
        if (!asset) return;

        if (!assetTotals[asset._id]) {
            assetTotals[asset._id] = {
                assetId: asset._id,
                maintenanceRequestId: assetMaintenanceRequest.assetMaintenanceRequestId,
                remark: assetMaintenanceRequest.remark,
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
        new apiResponse(200, responseData, "Total down time for all assets fetched successfully")
    );

});

export {getAllAssetsDownTime}