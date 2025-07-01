import { Router } from "express";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";
import { addChildLocation, addLocation, addParentLocation } from "../controllers/userControllers/hrManagementControllers/locationControllers/addLocation.controller.js";
import { getLocation } from "../controllers/userControllers/hrManagementControllers/locationControllers/getLocation.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);


//Location Routes - POST
router.route("/hr/location/add-location").post(authentication, addLocation)
router.route("/hr/location/add-child-location").post(authentication, addChildLocation);
router.route("/hr/location/add-parent-location").post(authentication, addParentLocation);
//Location Routes - GET
router.route("/hr/location/get-location/:locationId").get(authentication, getLocation);

export default router