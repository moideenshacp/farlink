import express from 'express'
import { employeeController } from '../controllers/employeeController'
import { authenticate } from '../middlewares/authMiddleware'

const router = express.Router()

const EmployeeController = new employeeController()


//admin=====================================================================================================================
router.post('/register-employee',(authenticate as never),EmployeeController.registerEmployee)
router.get('/get-employees',(authenticate as never),EmployeeController.getAllEmployees)
router.post('/update-employee',(authenticate as never),EmployeeController.updateEmployees)
router.post('/invite-employee',(authenticate as never),EmployeeController.inviteEmployee)
router.post('/set-up-password',EmployeeController.setUpPassword)
router.get('/fetch-EmployeesCount',(authenticate as never),EmployeeController.EmployeesCount)
router.get('/terminate-employee',(authenticate as never),EmployeeController.TerminateEmployee)
router.post('/add-position',(authenticate as never),EmployeeController.AddPosition)
router.post('/fetch-position',(authenticate as never),EmployeeController.fetchPosition)



export default router