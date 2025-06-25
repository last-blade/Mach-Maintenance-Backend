import { Router } from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { addAsset } from "../controllers/assetControllers/addAsset.controller.js";
import { createAssetCategory } from "../controllers/assetControllers/createAssetCategory.controller.js";
import { fetchAssetCategories } from "../controllers/assetControllers/fetchAssetCategories.controller.js";

const router = Router();

//POST
router.route("/add-asset").post(authentication, addAsset);
router.route("/add-asset-category").post(authentication, createAssetCategory);

//GET
router.route("/asset-categories").get(authentication, fetchAssetCategories);

//PATCH


//PUT


//DELETE

export default router;