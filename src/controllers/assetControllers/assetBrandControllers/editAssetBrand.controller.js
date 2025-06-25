import {apiError, apiResponse, AssetBrand, asyncHandler} from "../../allImports.js";

const editAssetBrand = asyncHandler(async (request, response) => {
  const { assetBrandId } = request.params;
  const { assetBrand, assetBrandDescription } = request.body;

  if (!assetBrandId) {
    throw new apiError(404, "Asset brand ID not found");
  }

  if (!assetBrand) {
    throw new apiError(404, "Asset brand name is required");
  }

  const updatedAssetBrand = await AssetBrand.findByIdAndUpdate(assetBrandId,{
    $set: {
      assetBrand,
      assetBrandDescription,
    },
  },{ new: true });

  return response
    .status(200)
    .json(new apiResponse(200, updatedAssetBrand, "Asset brand updated"));
});

export { editAssetBrand };
