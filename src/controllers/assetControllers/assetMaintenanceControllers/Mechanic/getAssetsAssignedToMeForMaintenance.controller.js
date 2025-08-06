import mongoose from "mongoose";
import { apiResponse, Asset, AssetMaintenance, asyncHandler } from "../../../allImports.js";

const getAssetsAssignedToMeForMaintenance = asyncHandler(async (request, response) => {
    // const assetsAssignedToMeForMaintenance = await AssetMaintenance.find({
    //     mechanic: request.user.id,
    // }).populate("assetId");

    const assetsAssignedToMeForMaintenance = await AssetMaintenance.aggregate([
        {
            $match: {
                mechanic: new mongoose.Types.ObjectId(request.user.id),
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
                        $lookup: {
                            from: "locations",
                            localField: "assetLocation",
                            foreignField: "_id",
                            as: "location"
                        }
                    },

                    {
                        $unwind: {
                            path: "$location",
                            preserveNullAndEmptyArrays: true
                        }
                    }
                ],
                as: "assetId"
            }
        },

        {
            $unwind: {
                path: "$assetId",
                preserveNullAndEmptyArrays: true,
            }
        }
    ])

    if(assetsAssignedToMeForMaintenance.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, "No assets found assigned to you for maintenance")
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, assetsAssignedToMeForMaintenance, "Assets fetched assigned to you for maintenance")
    )
});

export {getAssetsAssignedToMeForMaintenance}