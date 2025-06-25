import {apiError, apiResponse, AssetSupplier, asyncHandler} from "../../allImports.js";

const deleteAssetSupplier = asyncHandler(async (request, response) => {
  const { assetSupplierId } = request.params;

  if (!assetSupplierId) {
    throw new apiError(404, "Asset supplier ID not found");
  }

  const foundAssetSupplier = await AssetSupplier.findById(assetSupplierId);

  if (!foundAssetSupplier) {
    throw new apiError(404, "Asset supplier not found or may be deleted");
  }

  await AssetSupplier.findByIdAndDelete(assetSupplierId);

  return response
    .status(200)
    .json(new apiResponse(200, {}, "Asset supplier deleted"));
});

export { deleteAssetSupplier };
