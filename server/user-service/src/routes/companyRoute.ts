import express from "express";
const router = express.Router();
import { companyController } from "../controllers/companyController";
import { authenticate } from "../middlewares/authMiddleware";
import { IcompanyController } from "interfaces/IcompanyController";
import IorganizationRepository from "interfaces/IorganizationRepository";
import { organizationRepository } from "../repositories/organizationRepository";
import IcompanyService from "interfaces/IcompanyService";
import { companyService } from "../services/companyService";
import IuserRepo from "interfaces/IuserRepository";
import { userRepository } from "../repositories/userRepository";

const UserRepository:IuserRepo = new userRepository()

const CompanyRepository:IorganizationRepository  = new organizationRepository()
const CompanyService :IcompanyService = new companyService(UserRepository,CompanyRepository)
const CompanyController:IcompanyController = new companyController(CompanyService)

//admin==============================================================================================================================
router.post("/register-company",authenticate, CompanyController.registerCompany);
router.get("/get-companyProfile",authenticate , CompanyController.fetchCompanyProfile);
router.patch("/update-companyProfile",authenticate, CompanyController.updateCompanyProfile);
router.get('/get-subcriptionPlans',authenticate,CompanyController.findSubcription)



//superAdmin=====================================================================================================================
router.get('/fetch-allOrganization',authenticate,CompanyController.fetchAllOrganization)
router.get('/block-organization',authenticate,CompanyController.blockOrganization)

export default router;
