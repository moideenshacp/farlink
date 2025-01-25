import express from 'express'
import { employeeController } from '../controllers/employeeController'
import { authenticate } from '../middlewares/authMiddleware'
import IemployeeRepo from '../interfaces/IemployeeRepository'
import { employeeRepository } from '../repositories/employeeRepository'
import IpositionRepo from '../interfaces/IpositionRepo'
import { positionRepository } from '../repositories/positionsRepo'
import { IemployeeService } from '../interfaces/IemployeeService'
import { employeeService } from '../services/employeeService'

const router = express.Router()

const EmployeeRepository:IemployeeRepo = new employeeRepository()
const PositionRepository:IpositionRepo = new positionRepository()
const EmployeeService:IemployeeService = new employeeService(EmployeeRepository,PositionRepository)
const EmployeeController = new employeeController(EmployeeService)


//admin=====================================================================================================================
router.post('/register-employee',authenticate,EmployeeController.registerEmployee)
router.get('/get-employees',authenticate,EmployeeController.getAllEmployees)
router.patch('/update-employee',authenticate,EmployeeController.updateEmployees)
router.post('/invite-employee',authenticate,EmployeeController.inviteEmployee)
router.post('/set-up-password',EmployeeController.setUpPassword)
router.get('/fetch-EmployeesCount',authenticate,EmployeeController.EmployeesCount)
router.get('/terminate-employee',authenticate,EmployeeController.TerminateEmployee)
router.post('/add-position',authenticate,EmployeeController.AddPosition)
router.get('/fetch-position',authenticate,EmployeeController.fetchPosition)
router.get('/fetch-employeesById',authenticate,EmployeeController.fetchEmployeesId)



export default router