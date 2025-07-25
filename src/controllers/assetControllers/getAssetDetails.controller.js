import mongoose from "mongoose";
import { apiError, apiResponse, Asset, asyncHandler } from "../allImports.js";

const getAssetDetails = asyncHandler(async (request, response) => {

    const {assetId} = request.params;

    if(!assetId){
        throw new apiError(400, "Asset ID is required")
    }

    const allDetailsOfAsset = await Asset.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(assetId)
            }
        },

        {
            // $lookup: {
            //     from: "assetmaintenancerequests",
            //     localField: "_id",
            //     foreignField: "assetId",
            //     as: "assetMaintenanceRequests"
            // }

            $lookup: {
                from: "assetmaintenancerequests",
                let: {assetID: "$_id"}, //let: this is defining variables from the outer document (the current asset). assetID: "$_id" — this means: take the _id of current asset and call it assetID.

                pipeline: [
                    {
                        $match: {
                            $expr: { //$expr: allows comparing two fields using variables.
                                $eq: ["$assetId", "$$assetID"] // "$assetId": the field inside assetmaintenancerequests. "$$assetID": the value we defined from the outer document (i.e. the current asset’s _id)
                            }
                        }
                    },

                    {
                        $lookup: {
                            from: request.user.accountType==="Admin" || "HR" ? "users" : "employees", //from: "users or employees" — join with the users collection.
                            let: {
                                creatorId: "$assetMaintenanceRequestCreator", //creatorId: "$assetMaintenanceRequestCreator" → the one who created the request
                                creatorModel: "$creatorModel" //creatorModel: "$creatorModel" → whether creator is "User" or "Employee" $$creatorModel == "User" → only populate if the creator is a User
                            },

                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$$creatorModel", "User"] },
                                                { $eq: ["$_id", "$$creatorId"] }
                                            ]
                                        }
                                    }
                                },
                                
                                {
                                    $project: {
                                        password: 0,
                                        __v: 0,
                                        refreshToken: 0,
                                        createdAt: 0,
                                        updatedAt: 0,
                                        _id: 0,
                                        email: 0,
                                    }
                                }
                            ],

                            as: "maintenanceRequestUser"
                        }
                    },
                    
                    {
                        $unwind: {
                            path: "$maintenanceRequestUser",
                            preserveNullAndEmptyArrays: true // preserveNullAndEmptyArrays lets it continue if no user found (i.e. maybe it was an Employee).
                        }
                    }
                ],

                as: "assetMaintenanceRequests"
            },
        },

        {
            $lookup: {
                from: "assetmaintenances",
                localField: "_id",
                foreignField: "assetId",
                as: "assetMaintenanceMechanicHistory"
            }
        },

        {
            $lookup: {
                from: "assettransferhistories",
                localField: "_id",
                foreignField: "assetId",
                as: "assetTransferHistories"
            }
        },

    ]);

    return response.status(200)
    .json(
        new apiResponse(200, allDetailsOfAsset, "All details of asset fetched")
    )
});

export {getAssetDetails}