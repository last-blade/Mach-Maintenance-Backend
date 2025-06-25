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

const router = Router();

//POST
router.route("/add-asset").post(authentication, addAsset);
router.route("/add-asset-category").post(authentication, createAssetCategory);
router.route("/add-asset-brand").post(authentication, createAssetBrand);

//GET
router.route("/asset-categories").get(authentication, fetchAssetCategories);
router.route("/asset-brands").get(authentication, fetchAssetBrands);

//PATCH

//PUT
router.route("/edit-asset-category/:assetCategoryId").put(authentication, editAssetCategory);
router.route("/edit-asset-brand/:assetBrandId").put(authentication, editAssetBrand);

//DELETE
router.route("/delete-asset-category/:assetCategoryId").delete(authentication, deleteAssetCategory);
router.route("/delete-asset-brand/:assetBrandId").delete(authentication, deleteAssetBrand);

export default router;
