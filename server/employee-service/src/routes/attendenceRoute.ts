import express from 'express'
import { authenticate } from '../middlewares/authMiddleware'
import { attendenceController } from '../controllers/attendenceController'

const router = express.Router()

const AttendenceController = new attendenceController()


//admin=====================================================================================================================

router.post('/update-policy',(authenticate as never),AttendenceController.UpdateAttendencePolicy)
router.get('/get-policy',(authenticate as never),AttendenceController.getAttendencePolicy)
router.post('/handle-attendence',(authenticate as never),AttendenceController.handleAttendence)
router.get('/get-attendence',(authenticate as never),AttendenceController.getAttendenceReport)



export default router