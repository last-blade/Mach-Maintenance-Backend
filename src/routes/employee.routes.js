import { Router } from "express";
import { loginEmployee } from "../controllers/userControllers/hrManagementControllers/employeeControllers/loginEmployee.controller.js";
import { logoutEmployee } from "../controllers/userControllers/hrManagementControllers/employeeControllers/logoutEmployee.controller.js";

const router = Router();

router.route("/login").post(loginEmployee);
router.route("/logout").post(logoutEmployee);

export default router;