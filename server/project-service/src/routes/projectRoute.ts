import { Router } from 'express';
import IprojectRepository from '../interfaces/IprojectRepository';
import { projectRepository } from '../repositories/projectRepository';
import { IprojectService } from '../interfaces/IprojectService';
import { projectService } from '../services/projectService';
import { projectController } from '../controllers/projectController';


const router = Router();

const ProjectRepository:IprojectRepository = new projectRepository()
const ProjectService:IprojectService = new projectService(ProjectRepository)
const ProjectController = new projectController(ProjectService)

router.post('/create-project', ProjectController.createProject);
router.get('/fetch-projects', ProjectController.fetchAllProject);
router.patch('/update-project', ProjectController.updateProject);
router.get('/fetchEmployees-projects', ProjectController.fetchEmployeesProject);


export default router;
