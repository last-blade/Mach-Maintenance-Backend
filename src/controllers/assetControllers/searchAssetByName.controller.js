import { apiResponse, Asset, asyncHandler } from "../allImports.js";

const searchAssetByName = asyncHandler(async (request, response) => {
   let {query} = request.query;     

   query = query.toString().trim();

    const searchedAsset = await Asset.find({
        $or: [
            {
                assetName: {$regex: query, $options: "i"}
            },

            {
                assetModelNo: {$regex: query, $options: "i"}
            },

            {
                assetCode: {$regex: query, $options: "i"}
            },
        ]
    }).populate("assetCategory assetBrand assetSupplier assetLocation", "assetCategory assetBrand assetSupplierName assetType assetSupplierPhone assetCompanyName locationCode locationName")
    .select("-assetCreator");

    if(searchedAsset.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, `No result found for ${query}`)
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, searchedAsset, `Assets found related to your search ${query}`)
    )

});

export {searchAssetByName}