import { Router } from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { addChildLocation, addLocation, addParentLocation } from "../controllers/userControllers/hrManagementControllers/locationControllers/addLocation.controller.js";
import { getLocation } from "../controllers/userControllers/hrManagementControllers/locationControllers/getLocation.controller.js";

const router = Router();

//Location Routes - POST
router.route("/location/add-location").post(authentication, addLocation)
router.route("/location/add-child-location").post(authentication, addChildLocation);
router.route("/location/add-parent-location").post(authentication, addParentLocation);
//Location Routes - GET
router.route("/location/get-location/:locationId").get(authentication, getLocation);

export default router;