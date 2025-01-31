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


export default router