import { Asset, asyncHandler } from "../../../allImports.js";

const getAssetDetails = asyncHandler(async (request, response) => {
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

export {getAssetDetails}