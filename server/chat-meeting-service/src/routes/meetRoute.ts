import { Router } from "express";
import ImeetRepository from "../interfaces/ImeetRepository";
import { meetRepository } from "../repositories/meetingRepository";
import { ImeetingService } from "../interfaces/ImeetingService";
import { meetService } from "../services/meetingService";
import { ImeetingController } from "../interfaces/ImeetingController";
import { meetController } from "../controllers/meetingController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router()

const MeetRepository:ImeetRepository = new meetRepository()
const MeetService:ImeetingService = new meetService(MeetRepository)
const MeetConstroller:ImeetingController = new meetController(MeetService)

router.post('/create-meet',authenticate,MeetConstroller.createMeeting)
router.patch('/edit-meet',authenticate,MeetConstroller.editMeeting)
router.get('/fetch-meets',authenticate,MeetConstroller.fetchMeeting)
router.get('/fetchEmployees-Allmeets',authenticate,MeetConstroller.fetchAllMeetsOfEmployee)
router.delete('/delete-meet',authenticate,MeetConstroller.deleteMeeting)


export default router