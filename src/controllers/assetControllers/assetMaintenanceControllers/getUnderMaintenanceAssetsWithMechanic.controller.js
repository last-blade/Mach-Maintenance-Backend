import mongoose from "mongoose";
import { apiResponse, Asset, AssetMaintenance, asyncHandler } from "../../allImports.js";

const getUnderMaintenanceAssetsWithMechanic = asyncHandler(async (request, response) => {

    const underMaintenanceAssets = await Asset.aggregate([
        // {
        //     $match: {
        //         mechanic: new mongoose.Types.ObjectId(request.user.id)
        //     }
        // },

        {
            $lookup: {
                from: "assetmaintenances",
                localField: "_id",
                foreignField: "assetId",
                as: "assetsUnderMaintenance"
            }
        }

    ]); 
    
    return response.status(200)
    .json(
        new apiResponse(200, underMaintenanceAssets, "fetched")
    )

});

export {getUnderMaintenanceAssetsWithMechanic}