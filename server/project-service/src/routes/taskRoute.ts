import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import ItaskRepository from '../interfaces/ItaskRepository';
import { taskRepository } from '../repositories/taskRepository';
import { ItaskService } from '../interfaces/ItaskService';
import { taskController } from '../controllers/taskController';
import { taskService } from '../services/taskService';


const router = Router();

const TaskRepository:ItaskRepository = new taskRepository()
const TaskService:ItaskService = new taskService(TaskRepository)
const TaskController = new taskController(TaskService)

router.post('/create-task',authenticate, TaskController.createTask);
router.get('/fetch-tasks',authenticate, TaskController.fetchTasks);
router.patch('/update-task',authenticate, TaskController.updateTask);
router.get('/fetchEmployees-tasks',authenticate, TaskController.fetchEmployeesTask);



export default router;
