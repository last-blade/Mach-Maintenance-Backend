import { Router } from "express";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";
import { addChildLocation, addLocation, addParentLocation } from "../controllers/userControllers/hrManagementControllers/locationControllers/addLocation.controller.js";
import { getLocation } from "../controllers/userControllers/hrManagementControllers/locationControllers/getLocation.controller.js";
import { getParentLocation } from "../controllers/userControllers/hrManagementControllers/locationControllers/getParentLocation.controller.js";
import { editLocation } from "../controllers/userControllers/hrManagementControllers/locationControllers/editLocation.controller.js";
import { deleteLocation } from "../controllers/userControllers/hrManagementControllers/locationControllers/deleteLocation.controller.js";
import { addDepartment } from "../controllers/userControllers/hrManagementControllers/departmentControllers/addDepartment.controller.js";
import { fetchDepartment } from "../controllers/userControllers/hrManagementControllers/departmentControllers/fetchDepartment.controller.js";
import { editDepartment } from "../controllers/userControllers/hrManagementControllers/departmentControllers/editDepartment.controller.js";
import { deleteDepartment } from "../controllers/userControllers/hrManagementControllers/departmentControllers/deleteDepartment.controller.js";
import { addEmployee } from "../controllers/userControllers/hrManagementControllers/employeeControllers/addEmployee.controller.js";
import { getEmployees } from "../controllers/userControllers/hrManagementControllers/employeeControllers/getEmployees.controller.js";
import { editEmployee } from "../controllers/userControllers/hrManagementControllers/employeeControllers/editEmployee.controller.js";
import { deleteEmployee } from "../controllers/userControllers/hrManagementControllers/employeeControllers/deleteEmployee.controller.js";
import { logoutUser } from "../controllers/userControllers/logoutUser.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authentication, logoutUser);


//---------------------------------------------------------------HR Routes------------------------------------------------------------------
//~LOCATION-ROUTES
//Location Routes - POST
router.route("/hr/location/add-location").post(authentication, addLocation)
router.route("/hr/location/add-child-location").post(authentication, addChildLocation);
router.route("/hr/location/add-parent-location").post(authentication, addParentLocation);
//Location Routes - GET
router.route("/hr/location/get-location/:locationId").get(authentication, getLocation);
router.route("/hr/location/get-parent-location").get(authentication, getParentLocation);
//Location Routes - PUT
router.route("/hr/edit-location/:locationId").put(authentication, editLocation);
//Location Routes - DELETE
router.route("/hr/location/delete-location/:locationId").delete(authentication, deleteLocation);

//~DEPARTMENT-ROUTES
//POST
router.route("/hr/department/add-department").post(authentication, addDepartment);
//GET
router.route("/hr/department/departments").get(authentication, fetchDepartment);
//PUT
router.route("/hr/department/edit/:departmentId").put(authentication, editDepartment);
//DELETE
router.route("/hr/department/delete/:departmentId").delete(authentication, deleteDepartment);

//~EMPLOYEE-ROUTES
//POST
router.route("/hr/employee/add-employee").post(authentication, addEmployee);
//GET
router.route("/hr/employee/employees").get(authentication, getEmployees);
//PUT
router.route("/hr/employee/edit/:employeeId").put(authentication, editEmployee);
//DELETE
router.route("/hr/employee/:employeeId").delete(authentication, deleteEmployee);

export default router