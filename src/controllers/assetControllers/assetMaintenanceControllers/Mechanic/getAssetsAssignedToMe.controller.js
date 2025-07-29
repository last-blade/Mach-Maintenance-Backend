import { Asset, asyncHandler } from "../../../allImports.js";

const getAssetsAssignedToMe = asyncHandler(async (request, response) => {
    const asset = await Asset.aggregate([
        {
            $lookup: {
                from: "assetmaintenancerequests",
                localField: "_id",
                foreignField: "",
                as: "",
            }   
        }
    ])
});

export {getAssetsAssignedToMe}