import express from 'express'
import { employeeController } from '../controllers/employeeController'
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
router.post('/register-employee',EmployeeController.registerEmployee)
router.get('/get-employees',EmployeeController.getAllEmployees)
router.patch('/update-employee',EmployeeController.updateEmployees)
router.post('/invite-employee',EmployeeController.inviteEmployee)
router.post('/set-up-password',EmployeeController.setUpPassword)
router.get('/fetch-EmployeesCount',EmployeeController.EmployeesCount)
router.get('/terminate-employee',EmployeeController.TerminateEmployee)
router.post('/add-position',EmployeeController.AddPosition)
router.get('/fetch-position',EmployeeController.fetchPosition)
router.get('/fetch-employeesById',EmployeeController.fetchEmployeesId)



export default router