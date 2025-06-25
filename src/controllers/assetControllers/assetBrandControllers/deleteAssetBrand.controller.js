import {apiError, apiResponse, AssetBrand, asyncHandler} from "../../allImports.js";

const deleteAssetBrand = asyncHandler(async (request, response) => {
  const { assetBrandId } = request.params;

  if (!assetBrandId) {
    throw new apiError(404, "Asset brand ID not found");
  }

  const foundAssetBrand = await AssetBrand.findById(assetBrandId);

  if (!foundAssetBrand) {
    throw new apiError(404, "Asset brand not found or may be deleted");
  }

  await AssetBrand.findByIdAndDelete(assetBrandId);

  return response
    .status(200)
    .json(new apiResponse(200, {}, "Asset brand deleted"));
});

export { deleteAssetBrand };
