import mongoose from "mongoose";
import { apiResponse, AssetMaintenanceRequest, asyncHandler } from "../../../allImports.js";

const getAllAssetsWithMechanicsAssignedToCorrespondingMaintenenaceRequest = asyncHandler(async (request, response) => {
    const assetMechanicsCorrespondingToMaintenanceRequest = await AssetMaintenanceRequest.aggregate([
        // {
        //     $match: {
        //         assetMaintenanceRequestCreator: new mongoose.Types.ObjectId(request.user.id)
        //     }
        // },

        {
            $lookup: {
                from: "assetmaintenances",
                let: {mntcId: "$_id"}, //maintenanceRequest model ke andar kaa field  i.e. localField

                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$assetMaintenanceRequestId", "$$mntcId"]
                            }
                        }
                    },

                    {
                        $lookup: {
                            from: "employees",
                            // localField: "mechanic",
                            // foreignField: "_id",
                            // as: "mechanic"
                            let: {mechanicID: "$mechanic"},
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$_id", "$$mechanicID"]
                                        }
                                    }
                                },

                                {
                                    $project: {
                                        password: 0,
                                        refreshToken: 0,
                                        __v: 0,
                                    }
                                }
                            ],
                            as: "mechanic"
                        }
                    },
                    
                ],

                as: "result"
            }
        },

        {
            $lookup: {
                from: "assets",
                // localField: "assetId",
                // foreignField: "_id",
                // as: "asset"
                let: {assetID: "$assetId"},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$assetID"]
                            }
                        }
                    },

                    {
                        $lookup: {
                            from: "locations",
                            let: {locationId: "$assetLocation"},

                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$_id", "$$locationId"]
                                        }
                                    }
                                },
                            ],
                            as: "location"
                        }
                    }
                ],
                as: "asset"
            }
        }
    ]);

    if(assetMechanicsCorrespondingToMaintenanceRequest.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, "No data found")
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, assetMechanicsCorrespondingToMaintenanceRequest, "Fetched mechanics corresponding to maintenance request raised by you")
    )
});

export {getAllAssetsWithMechanicsAssignedToCorrespondingMaintenenaceRequest}