import express from "express";
const router = express.Router();
import { companyController } from "../controllers/companyController";
import { authenticate } from "../middlewares/authMiddleware";

const CompanyController = new companyController()

//admin==============================================================================================================================
router.post("/register-company",authenticate, CompanyController.registerCompany);
router.get("/get-companyProfile",authenticate , CompanyController.fetchCompanyProfile);
router.post("/update-companyProfile",authenticate, CompanyController.updateCompanyProfile);


//superAdmin=====================================================================================================================
router.get('/fetch-allOrganization',authenticate,CompanyController.fetchAllOrganization)
router.get('/block-organization',authenticate,CompanyController.blockOrganization)

export default router;
