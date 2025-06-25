import {apiError, apiResponse, AssetSupplier, asyncHandler} from "../../allImports.js";

const editAssetSupplier = asyncHandler(async (request, response) => {
  const { assetSupplierId } = request.params;
  const { assetSupplierName, assetCompanyName, assetType, assetSupplierPhone, assetSupplierLandLine } = request.body;

  if (!assetSupplierId) {
    throw new apiError(404, "Asset supplier ID not found");
  }

  if ([assetSupplierName, assetCompanyName, assetType].some(inputField => inputField === undefined || inputField.trim() === "")) {
    throw new apiError(404, "All mandatory fields are required");
  }

  const updatedAssetSupplier = await AssetSupplier.findByIdAndUpdate(assetSupplierId,{
    $set: {
      assetSupplierName,
      assetCompanyName,
      assetType,
      assetSupplierPhone: assetSupplierPhone || "",
      assetSupplierLandLine: assetSupplierLandLine || "",
    },
  },{ new: true });

  return response
    .status(200)
    .json(new apiResponse(200, updatedAssetSupplier, "Asset supplier updated"));
});

export { editAssetSupplier };
