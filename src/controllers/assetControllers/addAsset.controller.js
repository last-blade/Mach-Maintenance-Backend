import { apiError, apiResponse, Asset, asyncHandler } from "../allImports.js";
import QRCode from "qrcode";

const addAsset = asyncHandler(async (request, response) => {
    const {assetCategory, assetModelNo, assetName, assetCode, 
        assetBrand, assetBarcodeNo, assetInvoiceNo, assetPurchaseDate, 
        assetPrice, specialAsset, assetStatus, assetSupplier, assetLocation
    } = request.body;

    if([assetCategory, assetModelNo, assetName, assetCode, 
        assetBrand, specialAsset, 
        assetStatus, assetSupplier, assetLocation].some(inputField => inputField === undefined || inputField.trim() === "")
    ){
        throw new apiError(404, "All mandatory fields are required to fill")
    }

    const qrData = `Asset ID: ${newASSET._id}
                    Asset Code: ${newASSET.assetCode}
                    Asset Name: ${newASSET.assetName}
                    Brand: ${newASSET.assetBrand} | ID: ${newASSET._id}`
    ;
    const qrCodeDataUri = await QRCode.toDataURL(qrData);

    const newASSET = await Asset.create({
        assetCategory, assetModelNo, assetName, assetCode, assetBrand, 
        assetBarcodeNo: assetBarcodeNo || "", 
        assetInvoiceNo: assetInvoiceNo || "", 
        assetPurchaseDate, assetPrice, specialAsset, assetStatus, assetSupplier, assetLocation,
        assetQrCodeUrl: qrCodeDataUri,
        assetCreator: request.user.id,
    }); 

    return response.status(201)
    .json(
        new apiResponse(201, { asset: newASSET, }, "Asset added")
    )

});

export {addAsset}