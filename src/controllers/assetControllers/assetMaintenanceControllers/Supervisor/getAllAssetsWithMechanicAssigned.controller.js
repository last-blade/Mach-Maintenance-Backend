import { apiResponse, AssetMaintenance, asyncHandler } from "../../../allImports.js";

const getAllAssetsWithMechanicAssigned = asyncHandler(async (request, response) => {
    // const mechanic

    const result = await AssetMaintenance.aggregate([
        {
            $lookup: {
                from: "assetmaintenancerequests",
                let: {requestId: "$assetMaintenanceRequestId"},

                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$requestId"]
                            }
                        }
                    },

                    {
                        $lookup: {
                            from: "assets",
                            let: {assetID: "$assetId"},

                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$_id", "$$assetID"]
                                        }
                                    }
                                }
                            ],

                            as: "assetDetails"
                        }
                    }
                ],
                as: "assetMaintenanceRequestDetails"
            },
        },

          {
            $lookup: {
                from: "employees",
                localField: "mechanic",
                foreignField: "_id",
                as: "mechanicDetails"
            }
        },
    ]);

    // const result = await AssetMaintenance.find({}).populate("assetMaintenanceRequestId").populate("mechanic").select("-password -refreshToken -__v")

    return response.status(200)
    .json(
        new apiResponse(200, result, "Fetched")
    )
});

export {getAllAssetsWithMechanicAssigned}