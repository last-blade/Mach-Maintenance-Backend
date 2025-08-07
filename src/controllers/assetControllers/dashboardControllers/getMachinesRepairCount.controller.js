import { apiResponse, AssetMaintenance, asyncHandler } from "../../allImports.js";

const getMachinesRepairCount = asyncHandler(async (request, response) => {
    const eachMachineRepairCount = await AssetMaintenance.aggregate([
        {
            $match: {
                isActive: false
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
                    },

                    {
                        $group: {
                            _id: "$assetName",
                            total: {$sum: 1}
                        }
                    },

                    {
                        $sort: {
                            total: -1
                        }
                    },

                    {
                        $limit: 5
                    }

                ],
                as: "assetRepairCount"
            }
        },

        {
            $unwind: {
                path: "$assetRepairCount",
                preserveNullAndEmptyArrays: true
            },
        },

        {
            $project: {
                assetRepairCount: 1,
                _id: 0
            }
        },
    ]);

    return response.status(200)
    .json(
        new apiResponse(200, eachMachineRepairCount, "Machines repair count fetched")
    )
});

export {getMachinesRepairCount}