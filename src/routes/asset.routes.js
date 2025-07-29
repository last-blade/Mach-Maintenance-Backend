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
import { deleteAsset } from "../controllers/assetControllers/deleteAsset.controller.js";
import { getAsset } from "../controllers/assetControllers/getAsset.controller.js";
import { editAsset } from "../controllers/assetControllers/editAsset.controller.js";
import { getAssetDetails } from "../controllers/assetControllers/getAssetDetails.controller.js";
import { assignAssetMaintenanceMechanic } from "../controllers/assetControllers/assetMaintenanceControllers/Supervisor/assignAssetMaintenanceMechanic.controller.js";
import { createAssetMaintenanceRequest } from "../controllers/assetControllers/assetMaintenanceControllers/MaintenanceRequestor/createAssetMaintenanceRequest.controller.js";
import { getAssetMaintenance } from "../controllers/assetControllers/assetMaintenanceControllers/getAssetMaintenance.controller.js";
import { getUnderMaintenanceAssetsWithMechanic } from "../controllers/assetControllers/assetMaintenanceControllers/getUnderMaintenanceAssetsWithMechanic.controller.js";
import { getAllAssetsUnderMaintenance } from "../controllers/assetControllers/assetMaintenanceControllers/getAllAssetsUnderMaintenance.controller.js";
import { getAssetMaintenanceRequests } from "../controllers/assetControllers/assetMaintenanceControllers/MaintenanceRequestor/getAssetMaintenanceRequests.controller.js";
import { updateAssetMaintenanceStatus } from "../controllers/assetControllers/assetMaintenanceControllers/Mechanic/updateAssetMaintenanceStatus.controller.js";
import { closeAssetMaintenanceRequest } from "../controllers/assetControllers/assetMaintenanceControllers/Supervisor/closeAssetMaintenanceRequest.controller.js";
import { authorizeRoles } from "../middlewares/authorizeRole.middleware.js";
import { getAllAssetsWithMechanicAssigned } from "../controllers/assetControllers/assetMaintenanceControllers/Supervisor/getAllAssetsWithMechanicAssigned.controller.js";
import { getAcknowledgementsCorrespondingToMaintenanceId } from "../controllers/assetControllers/assetMaintenanceControllers/Supervisor/getAcknowledgementsCorrespondingToMaintenanceId.controller.js";
import { getAcknowledgementDetailsForSupervisor } from "../controllers/assetControllers/assetMaintenanceControllers/Supervisor/getAcknowledgementDetailsForSupervisor.controller.js";
import { getAssetsAssignedToMeForMaintenance } from "../controllers/assetControllers/assetMaintenanceControllers/Mechanic/getAssetsAssignedToMeForMaintenance.controller.js";

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
router.route("/asset-maintenance").get(authentication, getAssetMaintenance);
router.route("/asset-transfer-history").get(authentication, getAssetTransferHistory);
router.route("/asset/:assetId").get(getAsset);
router.route("/asset-history/:assetId").get(authentication, getAssetDetails);
router.route("/under-maintenance-with-mechanic").get(authentication, getUnderMaintenanceAssetsWithMechanic);
router.route("/under-maintenance").get(authentication, getAllAssetsUnderMaintenance);



//PATCH
router.route("/change-asset-location/:assetId").patch(authentication, authorizeRoles("Production", "Supervisor", "Admin", "HR"),updateAssetLocation);

//PUT
router.route("/edit-asset/:assetId").put(authentication, editAsset);
router.route("/edit-asset-category/:assetCategoryId").put(authentication, editAssetCategory);
router.route("/edit-asset-brand/:assetBrandId").put(authentication, editAssetBrand);
router.route("/edit-asset-supplier/:assetSupplierId").put(authentication, editAssetSupplier);
router.route("/edit-asset-spare/:assetSpareId").put(authentication, editAssetSpare);

//DELETE
router.route("/delete-asset-category/:assetCategoryId").delete(authentication, deleteAssetCategory);
router.route("/delete-asset-brand/:assetBrandId").delete(authentication, deleteAssetBrand);
router.route("/delete-asset-supplier/:assetSupplierId").delete(authentication, deleteAssetSupplier);
router.route("/delete-asset-spare/:assetSpareId").delete(authentication, deleteAssetSpare);
router.route("/delete-asset/:assetId").delete(authentication, deleteAsset);


//^-----------------------------------------------------Maintenance Related Routes----------------------------------------------------------

//~Production
//POST
router.route("/raise-maintenance-request/:assetId").post(authentication, authorizeRoles("Production"),createAssetMaintenanceRequest);
//GET
router.route("/asset-maintenance-requests").get(authentication, authorizeRoles("Production"),getAssetMaintenanceRequests);




//~Supervisor
//POST
router.route("/assign-maintenance-mechanic").post(authentication, authorizeRoles("Supervisor"),assignAssetMaintenanceMechanic);
//PATCH
router.route("/close-maintenance-request/:assetId").patch(authentication, authorizeRoles("Supervisor"), closeAssetMaintenanceRequest);
//GET
router.route("/assets-with-mechanics").get(authentication, authorizeRoles("Supervisor"), getAllAssetsWithMechanicAssigned);
router.route("/acknowledgements-of-maintenance").get(authentication, authorizeRoles("Supervisor"), getAcknowledgementsCorrespondingToMaintenanceId);
router.route("/acknowledgement/:acknowledgementId").get(authentication, authorizeRoles("Supervisor"), getAcknowledgementDetailsForSupervisor);


//~Mechanic
//POST
router.route("/send-acknowledgement").post(authentication, authorizeRoles("Mechanic"),updateAssetMaintenanceStatus);
//GET
router.route("/maintenances-assigned-to-me").get(authentication, authorizeRoles("Mechanic"), getAssetsAssignedToMeForMaintenance);
export default router;
