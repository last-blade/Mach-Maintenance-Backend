import { apiError, apiResponse, Asset, asyncHandler } from "../allImports.js";
import QRCode from "qrcode";

const editAsset = asyncHandler(async(request, response) => {
    const {assetId} = request.params;

    if(!assetId){
        throw new apiError(400, "Asset ID not found")
    }

    const foundAsset = await Asset.findById(assetId);

    if(!foundAsset){
        throw new apiError(404, "Asset not found")
    }

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

    
    const updatedAsset = await Asset.findByIdAndUpdate(assetId, {
        assetCategory, assetModelNo, assetName, assetCode, assetBrand, 
        assetBarcodeNo: assetBarcodeNo || "", 
        assetInvoiceNo: assetInvoiceNo || "", 
        assetPurchaseDate, assetPrice, specialAsset, assetStatus, assetSupplier, assetLocation,
    }, {new: true});

    const qrData = `Asset ID: ${updatedAsset._id}
                    Asset Code: ${updatedAsset.assetCode}
                    Asset Name: ${updatedAsset.assetName}
                    Brand: ${updatedAsset.assetBrand} | ID: ${updatedAsset._id}`
    ;
    const qrCodeDataUri = await QRCode.toDataURL(qrData);
    
    updatedAsset.assetQrCodeUrl = qrCodeDataUri;
    await updatedAsset.save({validateBeforeSave: false});

    return response.status(200)
    .json(
        new apiResponse(200, {
            asset: updatedAsset, 
        }, "Asset updated")
    )

});

export {editAsset}