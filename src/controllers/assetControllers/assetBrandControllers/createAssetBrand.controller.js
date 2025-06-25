import {apiError, apiResponse, AssetBrand, asyncHandler} from "../../allImports.js";

const createAssetBrand = asyncHandler(async (request, response) => {
  const { assetBrand, assetBrandDescription } = request.body;

  if (!assetBrand) {
    throw new apiError(404, "Asset brand name is required");
  }

  const brand = await AssetBrand.create({
    assetBrand,
    assetBrandDescription,
    assetBrandCreator: request.user.id,
  });

  return response
    .status(201)
    .json(new apiResponse(201, brand, "Asset brand added"));
});

export { createAssetBrand };
