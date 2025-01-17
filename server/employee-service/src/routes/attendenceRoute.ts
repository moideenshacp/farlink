import express from 'express'
import { authenticate } from '../middlewares/authMiddleware'
import { attendenceController } from '../controllers/attendenceController'
import IattendenceRepo from '../interfaces/IattendenceRepo'
import { AttendancePolicyRepository } from '../repositories/policyRepository'
import { IattendenceService } from '../interfaces/IattendenceService'
import { attendenceService } from '../services/attendenceService'
import IpolicyRepo from '../interfaces/IpolicyRepo'
import { AttendanceRepository } from '../repositories/attendenceRepo'

const router = express.Router()

const policyRepository :IpolicyRepo = new AttendancePolicyRepository()
const attendenceRepository:IattendenceRepo = new AttendanceRepository()
const AttendenceService :IattendenceService = new attendenceService(policyRepository,attendenceRepository)
const AttendenceController = new attendenceController(AttendenceService)


//admin=====================================================================================================================

router.post('/update-policy',(authenticate as never),AttendenceController.UpdateAttendencePolicy)
router.get('/get-policy',(authenticate as never),AttendenceController.getAttendencePolicy)
router.post('/handle-attendence',(authenticate as never),AttendenceController.handleAttendence)

//common====================================================================================================================
router.get('/get-attendence',(authenticate as never),AttendenceController.getAttendenceReport)



export default router