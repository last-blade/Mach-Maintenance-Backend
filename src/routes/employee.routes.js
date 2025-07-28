import { Router } from "express";
import { loginEmployee } from "../controllers/userControllers/hrManagementControllers/employeeControllers/loginEmployee.controller.js";
import { logoutEmployee } from "../controllers/userControllers/hrManagementControllers/employeeControllers/logoutEmployee.controller.js";
import { addEmployee } from "../controllers/userControllers/hrManagementControllers/employeeControllers/addEmployee.controller.js";
import { authentication } from "../middlewares/auth.employee.middleware.js";

const router = Router();

router.route("/register").post(addEmployee);
router.route("/login").post(loginEmployee);
router.route("/logout").post(authentication, logoutEmployee);

export default router;