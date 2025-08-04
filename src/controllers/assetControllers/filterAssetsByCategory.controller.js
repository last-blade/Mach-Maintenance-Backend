import mongoose from "mongoose";
import { apiError, apiResponse, Asset, AssetMaintenance, asyncHandler, Employee } from "../allImports.js";

const filterAssetsByCategory = asyncHandler(async (request, response) => {
    const {category, mechanic, location} = request.body;

    const filter = {};

    if(category){
        if(!mongoose.Types.ObjectId.isValid(category)){
            throw new apiError(400, "Category ID is not valid")
        }
        filter.assetCategory = category
    }

    // if(mechanic){
    //     if(!mongoose.Types.ObjectId.isValid(mechanic)){
    //         throw new apiError(400, "Mechanic ID is not valid")
    //     }
    // }

    if(location){
        if(!mongoose.Types.ObjectId.isValid(location)){
            throw new apiError(400, "Location ID is not valid")
        }
        filter.assetLocation = location
    }

    // const result = await AssetMaintenance.aggregate([
    //     {
    //         $match: {
    //             mechanic: new mongoose.Types.ObjectId(mechanic),
    //         }
    //     },

    //     {
    //         $lookup: {
    //             from: "assets",
    //             localField: "assetId",
    //             foreignField: "_id",
    //             as: "assets"
    //         }
    //     },

    //     // {
    //     //     $project: {
    //     //         password: 0,
    //     //         refreshToken: 0,
    //     //     }
    //     // }
    // ]);

    const filteredAssets = await Asset.find(filter).populate("assetCategory assetBrand assetSupplier assetLocation", "assetCategory assetBrand assetSupplierName assetType assetSupplierPhone assetCompanyName locationCode locationName")
    .select("-assetCreator");

    if(filteredAssets.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, "No asset found, please adjust your filter")
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, filteredAssets, "Fetched")
    )

});

export {filterAssetsByCategory}