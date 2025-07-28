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

    const newASSET = await Asset.create({
        assetCategory, assetModelNo, assetName, assetCode, assetBrand, 
        assetBarcodeNo: assetBarcodeNo || "", 
        assetInvoiceNo: assetInvoiceNo || "", 
        assetPurchaseDate, assetPrice, specialAsset, assetStatus, assetSupplier, assetLocation,
        assetCreator: request.user.id,
    }); 

    const foundAsset = await Asset.findById(newASSET._id);

    if(!foundAsset){
        throw new apiError(500, "Something went wrong while adding asset")
    }

    const qrData = newASSET._id;
    const qrCodeDataUri = await QRCode.toDataURL(qrData);

    foundAsset.assetQrCodeUrl = qrCodeDataUri;
    await foundAsset.save({validateBeforeSave: false});

    return response.status(201)
    .json(
        new apiResponse(201, { asset: foundAsset, }, "Asset added")
    )

});

export {addAsset}