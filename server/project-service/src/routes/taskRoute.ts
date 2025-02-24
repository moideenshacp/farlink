import { Router } from 'express';
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

router.post('/create-task', TaskController.createTask);
router.get('/fetch-tasks', TaskController.fetchTasks);
router.get('/fetch-subTasks', TaskController.fetchAllSubTasks);
router.patch('/update-task', TaskController.updateTask);
router.patch('/update-subTask', TaskController.updateSubTask);
router.get('/fetchEmployees-tasks', TaskController.fetchEmployeesTask);
router.get('/fetchEmployees-Alltasks', TaskController.fetchAllTasksOfEmployee);
router.post('/create-subTask', TaskController.createSubTask);



export default router;
