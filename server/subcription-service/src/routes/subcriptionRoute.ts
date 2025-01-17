import { Router } from 'express';
import { subcriptionController } from '../controllers/subcriptionController';
import { authenticate } from '../middlewares/authMiddleware';
import { Isubcriptionservice } from '../interfaces/IsubcriptionService';
import { subcriptionService } from '../services/subcriptionService';
import IsubcriptionRepository from '../interfaces/IsubcriptionRepository';
import { subcriptionRepository } from '../repositories/subcriptionRepository';

const router = Router();

const SubcriptionRepository:IsubcriptionRepository = new subcriptionRepository()
const SubcriptionService:Isubcriptionservice = new subcriptionService(SubcriptionRepository)
const SubcriptionController = new subcriptionController(SubcriptionService)

router.post('/webhook', SubcriptionController.webhook);
router.get('/get-subcriptionDetails',authenticate,SubcriptionController.getSubscriptionDetails)
router.post('/create-checkout-session',authenticate,SubcriptionController.createCheckoutSession)
router.post('/customer-portal-session',authenticate,SubcriptionController.createCustomerPortalSession)
router.get('/payment-history',authenticate,SubcriptionController.getPaymentHistory)
router.get('/All-payment-history',authenticate,SubcriptionController.getAllPaymentHistory)

export default router;
