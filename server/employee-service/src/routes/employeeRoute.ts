import express from 'express'
import { employeeController } from '../controllers/employeeController'

const router = express.Router()

const EmployeeController = new employeeController()

router.post('/register-employee',EmployeeController.registerEmployee)


export default router