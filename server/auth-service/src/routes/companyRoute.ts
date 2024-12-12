import express from "express";
const router = express.Router();
import { companyController } from "../controllers/companyController";
import { authenticate } from "../middlewares/authMiddleware";

const CompanyController = new companyController()

//admin==============================================================================================================================
router.post("/register-company",(authenticate as any), CompanyController.registerCompany);
router.get("/get-companyProfile",(authenticate as any), CompanyController.fetchCompanyProfile);
router.post("/update-companyProfile",(authenticate as any), CompanyController.updateCompanyProfile);


//superAdmin=====================================================================================================================
router.get('/fetch-allOrganization',(authenticate as any),CompanyController.fetchAllOrganization)

export default router;
