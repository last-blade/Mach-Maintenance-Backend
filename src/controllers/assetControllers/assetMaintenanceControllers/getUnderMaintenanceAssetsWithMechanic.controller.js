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
            // $lookup: {
            //     from: "assetmaintenances",
            //     localField: "_id",
            //     foreignField: "assetId",
            //     as: "assetsUnderMaintenance"
            // }

            $lookup: {
                from: "assetmaintenances",
                let: {assetID: "$_id"},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$assetId", "$$assetID"]
                            }
                        }
                    },

                    {
                        $lookup: {
                            from: "employees",
                            let: {mechanicId: "$mechanic"},
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$_id", "$$mechanicId"]
                                        }
                                    }
                                },
                                
                                {
                                    $project: {
                                        password: 0,
                                        refreshToken: 0,
                                        __v: 0,
                                        updatedAt: 0,
                                        createdAt: 0,
                                    }
                                }
                            ],
                            as: "mechanicDetails"
                        }
                    },
                ],
                as: "assetsUnderMaintenance"
            }, 
        },

        {
            $lookup: {
                from: "maintenanceacknowledgments",
                localField: "_id",
                foreignField: "assetId",
                as: "acknowledgement",
            }
        }

        // {
        //     $addFields: {
        //         mechanic: {
        //             $arrayElemAt: ["$assetsUnderMaintenance.mechanicDetails", 0]
        //         }
        //     }
        // },

        // {
        //     $unset: "assetsUnderMaintenance"
        // }

    ]); 
    
    return response.status(200)
    .json(
        new apiResponse(200, underMaintenanceAssets, "fetched")
    )

});

export {getUnderMaintenanceAssetsWithMechanic}