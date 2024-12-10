import express from "express";
const router = express.Router();
import { companyController } from "../controllers/companyController";

const CompanyController = new companyController()


router.post("/register-company", CompanyController.registerCompany);
router.post("/get-companyProfile", CompanyController.fetchCompanyProfile);



export default router;
