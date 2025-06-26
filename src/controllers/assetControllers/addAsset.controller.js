import { apiError, apiResponse, Asset, asyncHandler } from "../allImports.js";
import QRCode from "qrcode";

const addAsset = asyncHandler(async (request, response) => {
    const {assetCategory, assetModelNo, assetName, assetCode, 
        assetBrand, assetBarcodeNo, assetInvoiceNo, assetPurchaseDate, 
        assetPrice, specialAsset, assetStatus, assetSupplier, assetLocation
    } = request.body;

    if([assetCategory, assetModelNo, assetName, assetCode, 
        assetBrand, assetPurchaseDate, assetPrice, specialAsset, 
        assetStatus, assetSupplier, assetLocation].some(inputField => inputField === undefined || inputField.trim() === "")
    ){
        throw new apiError(404, "All mandatory fields are required to fill")
    }

    const newASSET = await Asset.create({
        assetCategory, assetModelNo, assetName, assetCode, assetBrand, 
        assetBarcodeNo: assetBarcodeNo || "", 
        assetInvoiceNo: assetInvoiceNo || "", 
        assetPurchaseDate, assetPrice, specialAsset, assetStatus, assetSupplier, assetLocation,
        assetCreator: request.user.id,
    });

    const qrData = `Asset ID: ${newASSET._id}
                    Asset Code: ${newASSET.assetCode}
                    Asset Name: ${newASSET.assetName}
                    Brand: ${newASSET.assetBrand} | ID: ${newASSET._id}`
    ;
    const qrCodeDataUri = await QRCode.toDataURL(qrData); 

    return response.status(201)
    .json(
        new apiResponse(201, {
            asset: newASSET, 
            qrCode: qrCodeDataUri
        }, "Asset added")
    )

});

export {addAsset}