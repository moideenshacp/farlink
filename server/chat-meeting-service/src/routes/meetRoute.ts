import { Router } from "express";
import ImeetRepository from "../interfaces/ImeetRepository";
import { meetRepository } from "../repositories/meetingRepository";
import { ImeetingService } from "../interfaces/ImeetingService";
import { meetService } from "../services/meetingService";
import { ImeetingController } from "../interfaces/ImeetingController";
import { meetController } from "../controllers/meetingController";

const router = Router()

const MeetRepository:ImeetRepository = new meetRepository()
const MeetService:ImeetingService = new meetService(MeetRepository)
const MeetConstroller:ImeetingController = new meetController(MeetService)

router.post('/create-meet',MeetConstroller.createMeeting)
router.patch('/edit-meet',MeetConstroller.editMeeting)
router.get('/fetch-meets',MeetConstroller.fetchMeeting)
router.get('/fetchEmployees-Allmeets',MeetConstroller.fetchAllMeetsOfEmployee)
router.delete('/delete-meet',MeetConstroller.deleteMeeting)


export default router