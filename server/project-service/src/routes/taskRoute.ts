import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import ItaskRepository from '../interfaces/ItaskRepository';
import { taskRepository } from '../repositories/taskRepository';
import { ItaskService } from '../interfaces/ItaskService';
import { taskController } from '../controllers/taskController';
import { taskService } from '../services/taskService';
import IsubTaskRepository from '../interfaces/IsubTaskRepository';
import { subTaskRepository } from '../repositories/subTaskRepository';
import IprojectRepository from '../interfaces/IprojectRepository';
import { projectRepository } from '../repositories/projectRepository';


const router = Router();

const TaskRepository:ItaskRepository = new taskRepository()
const SubTaskRepository:IsubTaskRepository = new subTaskRepository()
const ProjectRepository:IprojectRepository = new projectRepository()
const TaskService:ItaskService = new taskService(TaskRepository,SubTaskRepository,ProjectRepository)
const TaskController = new taskController(TaskService)

router.post('/create-task',authenticate, TaskController.createTask);
router.get('/fetch-tasks',authenticate, TaskController.fetchTasks);
router.get('/fetch-subTasks',authenticate, TaskController.fetchAllSubTasks);
router.patch('/update-task',authenticate, TaskController.updateTask);
router.patch('/update-subTask',authenticate, TaskController.updateSubTask);
router.get('/fetchEmployees-tasks',authenticate, TaskController.fetchEmployeesTask);
router.get('/fetchEmployees-Alltasks',authenticate, TaskController.fetchAllTasksOfEmployee);
router.post('/create-subTask',authenticate, TaskController.createSubTask);



export default router;
