import express from 'express'
import { authenticate } from '../middlewares/authMiddleware'
import { leaveController } from '../controllers/leaveController'
import IpolicyRepo from '../interfaces/IpolicyRepo'
import { AttendancePolicyRepository } from '../repositories/policyRepository'
import IleaveRepo from '../interfaces/IleaveRepository'
import { leaveRepository } from '../repositories/leaveRepository'
import { IleaveService } from '../interfaces/IleaveService'
import { leaveService } from '../services/leaveService'

const router = express.Router()


const policyRepository :IpolicyRepo = new AttendancePolicyRepository()
const LeaveRepository :IleaveRepo = new leaveRepository()
const LeaveService :IleaveService = new leaveService(policyRepository,LeaveRepository)
const LeaveController = new leaveController(LeaveService)


//employee=====================================================================================================================

router.post('/apply-leave',(authenticate as never),LeaveController.handleLeaveApplication)
router.post('/fetch-leave',(authenticate as never),LeaveController.fetchAppliedLeaves)
router.post('/manage-leave',(authenticate as never),LeaveController.ManageAppliedLeaves)
router.post('/fetch-remainingLeaves',(authenticate as never),LeaveController.fetchRemainingLeaves)




export default router