import { Router } from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { addAsset } from "../controllers/assetControllers/addAsset.controller.js";
import { createAssetCategory } from "../controllers/assetControllers/assetCategoryControllers/createAssetCategory.controller.js";
import { fetchAssetCategories } from "../controllers/assetControllers/assetCategoryControllers/fetchAssetCategories.controller.js";
import { editAssetCategory } from "../controllers/assetControllers/assetCategoryControllers/editAssetCategory.controller.js";
import { deleteAssetCategory } from "../controllers/assetControllers/assetCategoryControllers/deleteAssetCategory.controller.js";
import { createAssetBrand } from "../controllers/assetControllers/assetBrandControllers/createAssetBrand.controller.js";
import { fetchAssetBrands } from "../controllers/assetControllers/assetBrandControllers/fetchAssetBrands.controller.js";
import { editAssetBrand } from "../controllers/assetControllers/assetBrandControllers/editAssetBrand.controller.js";
import { deleteAssetBrand } from "../controllers/assetControllers/assetBrandControllers/deleteAssetBrand.controller.js";
import { createAssetSupplier } from "../controllers/assetControllers/assetSupplierControllers/createAssetSupplier.controller.js";
import { fetchAssetSuppliers } from "../controllers/assetControllers/assetSupplierControllers/fetchAssetSuppliers.controller.js";
import { editAssetSupplier } from "../controllers/assetControllers/assetSupplierControllers/editAssetSupplier.controller.js";
import { deleteAssetSupplier } from "../controllers/assetControllers/assetSupplierControllers/deleteAssetSupplier.controller.js";
import { createAssetSpare } from "../controllers/assetControllers/assetSpareControllers/createAssetSpare.controller.js";
import { fetchAssetSpare } from "../controllers/assetControllers/assetSpareControllers/fetchAssetSpare.controller.js";
import { editAssetSpare } from "../controllers/assetControllers/assetSpareControllers/editAssetSpare.controller.js";
import { deleteAssetSpare } from "../controllers/assetControllers/assetSpareControllers/deleteAssetSpare.controller.js";
import { getAssets } from "../controllers/assetControllers/getAssets.controller.js";
import { updateAssetLocation } from "../controllers/assetControllers/updateAssetLocation.controller.js";
import { getAssetTransferHistory } from "../controllers/assetControllers/getAssetTransferHistory.controller.js";

const router = Router();

//POST
router.route("/add-asset").post(authentication, addAsset);
router.route("/add-asset-category").post(authentication, createAssetCategory);
router.route("/add-asset-brand").post(authentication, createAssetBrand);
router.route("/add-asset-supplier").post(authentication, createAssetSupplier);
router.route("/add-asset-spare").post(authentication, createAssetSpare);

//GET
router.route("/asset-categories").get(authentication, fetchAssetCategories);
router.route("/asset-brands").get(authentication, fetchAssetBrands);
router.route("/asset-suppliers").get(authentication, fetchAssetSuppliers);
router.route("/asset-spares").get(authentication, fetchAssetSpare);
router.route("/assets").get(authentication, getAssets);
router.route("/asset-transfer-history/:assetId").get(authentication, getAssetTransferHistory);

//PATCH
router.route("/change-asset-location/:assetId").patch(authentication, updateAssetLocation);

//PUT
router.route("/edit-asset-category/:assetCategoryId").put(authentication, editAssetCategory);
router.route("/edit-asset-brand/:assetBrandId").put(authentication, editAssetBrand);
router.route("/edit-asset-supplier/:assetSupplierId").put(authentication, editAssetSupplier);
router.route("/edit-asset-spare/:assetSpareId").put(authentication, editAssetSpare);

//DELETE
router.route("/delete-asset-category/:assetCategoryId").delete(authentication, deleteAssetCategory);
router.route("/delete-asset-brand/:assetBrandId").delete(authentication, deleteAssetBrand);
router.route("/delete-asset-supplier/:assetSupplierId").delete(authentication, deleteAssetSupplier);
router.route("/delete-asset-spare/:assetSpareId").delete(authentication, deleteAssetSpare);

export default router;
