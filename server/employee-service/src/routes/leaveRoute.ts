import express from 'express'
import { authenticate } from '../middlewares/authMiddleware'
import { leaveController } from '../controllers/leaveController'

const router = express.Router()

const LeaveController = new leaveController()


//employee=====================================================================================================================

router.post('/apply-leave',(authenticate as never),LeaveController.handleLeaveApplication)
router.post('/fetch-leave',(authenticate as never),LeaveController.fetchAppliedLeaves)
router.post('/manage-leave',(authenticate as never),LeaveController.ManageAppliedLeaves)




export default router