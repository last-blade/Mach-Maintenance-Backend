import { apiResponse, AssetScheduledMaintenance, asyncHandler } from "../../../allImports.js";

const getScheduledMaintenances = asyncHandler(async (request, response) => {
    // const scheduledMaintenances = await AssetScheduledMaintenance.find({}).populate("assetId");

    const scheduledMaintenances = await AssetScheduledMaintenance.aggregate([
        {
            $lookup: {
                from: "assets",
                localField: "assetId",
                foreignField: "_id",
                as: "asset"
            }
        },

        {
            $lookup: {
                from: "employees",
                localField: "maintenanceScheduledBy",
                foreignField: "_id",
                as: "scheduledBy"
            }
        },

        {
            $set: {
                scheduledBy: {
                    $arrayElemAt: ["$scheduledBy", 0]
                }
            }
        },

        {
            $project: {
                asset: 1,
                maintenanceScheduledBy: 1,
                maintenanceScheduledDate: 1,
                mechanic: 1,
                scheduledBy: {
                    _id: 1,
                    fullName: 1,
                    email: 1,
                }
            }
        },

        {
            $lookup: {
                from: "employees",
                localField: "mechanic",
                foreignField: "_id",
                as: "mechanic"
            }
        },

        {
            $set: {
                mechanic: {
                    $arrayElemAt: ["$mechanic", 0]
                }
            }
        },

        {
            $project: {
                "mechanic.password": 0,
                "mechanic.refreshToken": 0, 
            }
        }
    ]);

    return response.status(200)
    .json(
        new apiResponse(200, scheduledMaintenances, "Assets under scheduled maintenances fetched")
    )

});

export {getScheduledMaintenances}