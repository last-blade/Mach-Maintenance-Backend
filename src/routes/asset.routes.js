import { Router } from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { addAsset } from "../controllers/assetControllers/addAsset.controller.js";
import { createAssetCategory } from "../controllers/assetControllers/assetCategoryControllers/createAssetCategory.controller.js";
import { fetchAssetCategories } from "../controllers/assetControllers/assetCategoryControllers/fetchAssetCategories.controller.js";
import { editAssetCategory } from "../controllers/assetControllers/assetCategoryControllers/editAssetCategory.controller.js";
import { deleteAssetCategory } from "../controllers/assetControllers/assetCategoryControllers/deleteAssetCategory.controller.js";

const router = Router();

//POST
router.route("/add-asset").post(authentication, addAsset);
router.route("/add-asset-category").post(authentication, createAssetCategory);

//GET
router.route("/asset-categories").get(authentication, fetchAssetCategories);

//PATCH

//PUT
router
  .route("/edit-asset-category/:assetCategoryId")
  .put(authentication, editAssetCategory);

//DELETE
router
  .route("/delete-asset-category/:assetCategoryId")
  .delete(authentication, deleteAssetCategory);

export default router;
