import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import ItaskRepository from '../interfaces/ItaskRepository';
import { taskRepository } from '../repositories/taskRepository';
import { ItaskService } from '../interfaces/ItaskService';
import { taskController } from '../controllers/taskController';
import { taskService } from '../services/taskService';
import IsubTaskRepository from '../interfaces/IsubTaskRepository';
import { subTaskRepository } from '../repositories/subTaskRepository';


const router = Router();

const TaskRepository:ItaskRepository = new taskRepository()
const SubTaskRepository:IsubTaskRepository = new subTaskRepository()
const TaskService:ItaskService = new taskService(TaskRepository,SubTaskRepository)
const TaskController = new taskController(TaskService)

router.post('/create-task',authenticate, TaskController.createTask);
router.get('/fetch-tasks',authenticate, TaskController.fetchTasks);
router.patch('/update-task',authenticate, TaskController.updateTask);
router.patch('/update-subTask',authenticate, TaskController.updateSubTask);
router.get('/fetchEmployees-tasks',authenticate, TaskController.fetchEmployeesTask);
router.get('/fetchEmployees-Alltasks',authenticate, TaskController.fetchAllTasksOfEmployee);
router.post('/create-subTask',authenticate, TaskController.createSubTask);



export default router;
