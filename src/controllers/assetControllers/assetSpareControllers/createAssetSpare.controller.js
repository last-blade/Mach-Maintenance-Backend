import { apiError, apiResponse, AssetSpare, asyncHandler } from "../../allImports.js";

const createAssetSpare = asyncHandler(async (request, response) => {
    const {assetSpareName, assetSpareCategory, isAssetSpecialSpare} = request.body;

    if([assetSpareName, assetSpareCategory, isAssetSpecialSpare].some(inputField => inputField === undefined || inputField.trim() === "")){
        throw new apiError(404, "All fields are required")
    }

    const createdSpare = await AssetSpare.create({
        assetSpareName, 
        assetSpareCategory, 
        isAssetSpecialSpare,
        assetSpareCreator: request.user.id
    });

    const foundAssetSpare = await AssetSpare.findById(createdSpare._id).select("-assetSpareCreator -__v")

    if(!foundAssetSpare){
        throw new apiError(500, "Something went wrong while adding asset spare")
    }

    return response.status(201)
    .json(
        new apiResponse(201, foundAssetSpare, "Asset spare added")
    )

});

export {createAssetSpare}