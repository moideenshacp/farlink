import express from 'express'
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

router.post('/apply-leave',LeaveController.handleLeaveApplication)
router.patch('/edit-leave',LeaveController.editLeave)
router.get('/fetch-leave',LeaveController.fetchAppliedLeaves)
router.patch('/manage-leave',LeaveController.ManageAppliedLeaves)
router.get('/fetch-remainingLeaves',LeaveController.fetchRemainingLeaves)




export default router