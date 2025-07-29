/*
    neeche code mein assetmaintenanceId ke corresponding main 2 details fetch kar raha hoon i.e. maintenanceRequestId and mechanic details
    matlab ki assetMaintenanceid i.e. jo mechanic assign karte time id banegi uske corresponding ek maintenancerequestid bhi hogi 
    and ek mechanic bhi hoga, toh yeh sab maintenanceid ke corresponding fetch ho raha hai.

    maintenanceId----maintenanceRequestId
        |
        |
    mechanicDetails

    oopar diaggram mein maintenaceid ke corrsponding mechanic detauls or maintenance id kis requestid ke corresponding hai woh show ho raha hai 
*/

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