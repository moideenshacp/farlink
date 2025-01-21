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

router.post('/apply-leave',authenticate,LeaveController.handleLeaveApplication)
router.get('/fetch-leave',authenticate,LeaveController.fetchAppliedLeaves)
router.patch('/manage-leave',authenticate,LeaveController.ManageAppliedLeaves)
router.get('/fetch-remainingLeaves',authenticate,LeaveController.fetchRemainingLeaves)




export default router