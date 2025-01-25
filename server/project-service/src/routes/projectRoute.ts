import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import IprojectRepository from '../interfaces/IprojectRepository';
import { projectRepository } from '../repositories/projectRepository';
import { IprojectService } from '../interfaces/IprojectService';
import { projectService } from '../services/projectService';
import { projectController } from '../controllers/projectController';


const router = Router();

const ProjectRepository:IprojectRepository = new projectRepository()
const ProjectService:IprojectService = new projectService(ProjectRepository)
const ProjectController = new projectController(ProjectService)

router.post('/create-project',authenticate, ProjectController.createProject);
router.get('/fetch-projects',authenticate, ProjectController.fetchAllProject);


export default router;
