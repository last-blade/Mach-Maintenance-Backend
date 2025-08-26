import { apiError, apiResponse, Asset, AssetMaintenance, asyncHandler } from "../../../allImports.js";

const getAssetMaintenanceTimeOfParticularRequest = asyncHandler(async (request, response) => {
    const { assetId } = request.params;

    if (!assetId) {
        throw new apiError(400, "Asset ID required");
    }

    const foundAsset = await Asset.findById(assetId);
    if (!foundAsset) {
        throw new apiError(404, "Asset not found, maybe deleted");
    }

    const maintenanceDocs = await AssetMaintenance.find({
        assetId,
        isActive: false,
    });

    if (!maintenanceDocs.length) {
        return response.status(200).json(
            new apiResponse(200, {}, "No completed maintenance found for this asset")
        );
    }

    const maintenanceTimes = maintenanceDocs.map(asset => {
        const createdAt = new Date(asset.createdAt);
        const updatedAt = new Date(asset.updatedAt);
        const diffMs = updatedAt - createdAt; 
        const diffMinutes = diffMs / (1000 * 60);

        return {
            manintenanceId: asset._id,
            assetName: foundAsset.assetName,
            assetCode: foundAsset.assetCode,
            assetModelNo: foundAsset.assetModelNo,
            minutesTaken: diffMinutes.toFixed(2), 
        };
    });

    const totalMinutes = maintenanceTimes.reduce(
        (sum, item) => sum + parseFloat(item.minutesTaken),
        0
    );

    return response.status(200).json(
        new apiResponse(200, {
            assetId: foundAsset._id,
            assetName: foundAsset.assetName,
            assetCode: foundAsset.assetCode,
            assetModelNo: foundAsset.assetModelNo,
            individual: maintenanceTimes,
            totalMinutes: totalMinutes.toFixed(2),
            totalHours: (totalMinutes / 60).toFixed(2),
        }, "Maintenance times fetched successfully")
    );

});

export { getAssetMaintenanceTimeOfParticularRequest };
