import express from 'express'
import { authenticate } from '../middlewares/authMiddleware'
import { attendenceController } from '../controllers/attendenceController'
import IattendenceRepo from '../interfaces/IattendenceRepo'
import { AttendancePolicyRepository } from '../repositories/policyRepository'
import { IattendenceService } from '../interfaces/IattendenceService'
import { attendenceService } from '../services/attendenceService'
import IpolicyRepo from '../interfaces/IpolicyRepo'
import { AttendanceRepository } from '../repositories/attendenceRepo'
import IemployeeRepo from '../interfaces/IemployeeRepository'
import { employeeRepository } from '../repositories/employeeRepository'

const router = express.Router()

const policyRepository :IpolicyRepo = new AttendancePolicyRepository()
const attendenceRepository:IattendenceRepo = new AttendanceRepository()
const EmployeeRepository:IemployeeRepo = new employeeRepository()
const AttendenceService :IattendenceService = new attendenceService(policyRepository,attendenceRepository,EmployeeRepository)
const AttendenceController = new attendenceController(AttendenceService)


//admin=====================================================================================================================

router.patch('/update-policy',authenticate,AttendenceController.UpdateAttendencePolicy)
router.get('/get-policy',authenticate,AttendenceController.getAttendencePolicy)
router.post('/handle-attendence',authenticate,AttendenceController.handleAttendence)

//common====================================================================================================================
router.get('/get-attendence',authenticate,AttendenceController.getAttendenceReport)



export default router