import {apiError, apiResponse, AssetSupplier, asyncHandler} from "../../allImports.js";

const createAssetSupplier = asyncHandler(async (request, response) => {
  const { assetSupplierName, assetCompanyName, assetType, assetSupplierPhone, assetSupplierLandLine } = request.body;

  if ([assetSupplierName, assetCompanyName, assetType].some(inputField => inputField === undefined || inputField.trim() === "")) {
    throw new apiError(404, "All mandatory fields are required");
  }

  const supplier = await AssetSupplier.create({
    assetSupplierName,
    assetCompanyName,
    assetType,
    assetSupplierPhone: assetSupplierPhone || "",
    assetSupplierLandLine: assetSupplierLandLine || "",
    assetSupplierCreator: request.user.id,
  });

  return response
    .status(201)
    .json(new apiResponse(201, supplier, "Asset supplier added"));
});

export { createAssetSupplier };
