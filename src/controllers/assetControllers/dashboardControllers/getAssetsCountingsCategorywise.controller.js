import { apiResponse, Asset, asyncHandler } from "../../allImports.js";

const getAssetsCountingsCategorywise = asyncHandler(async (request, response) => {
    const assetsCountingsForEachCategory = await Asset.aggregate([
        {
            $facet: {
                totalAssets: [
                    {$count: "count"}
                ],

                byStatus: [
                    {
                        $group: {
                            _id: "$assetStatus",
                            total: {$sum: 1}
                        }
                    }
                ],

                underMaintenance: [

                    {
                        $match: {
                            underMaintenance: true,
                        }
                    },

                    {
                        $group: {
                            _id: "$underMaintenance",
                            total: {$sum: 1}
                        }
                    }
                ],

                specialAssets: [
                    {
                        $match: {
                            specialAsset: "Yes",
                        }
                    },

                    {
                        $group: {
                            _id: "$specialAsset",
                            total: {$sum: 1}
                        }
                    }
                ]

            }
        }

    ]);

    return response.status(200)
    .json(
        new apiResponse(200, assetsCountingsForEachCategory, "Assets countings fetched")
    )
});

export {getAssetsCountingsCategorywise}