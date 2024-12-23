import express from 'express'
import { employeeController } from '../controllers/employeeController'
import { authenticate } from '../middlewares/authMiddleware'

const router = express.Router()

const EmployeeController = new employeeController()

router.post('/register-employee',(authenticate as never),EmployeeController.registerEmployee)
router.get('/get-employees',(authenticate as never),EmployeeController.getAllEmployees)
router.post('/update-employee',(authenticate as never),EmployeeController.updateEmployees)



export default router