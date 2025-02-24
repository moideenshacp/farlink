import { Router } from 'express';
import { subcriptionController } from '../controllers/subcriptionController';
import { Isubcriptionservice } from '../interfaces/IsubcriptionService';
import { subcriptionService } from '../services/subcriptionService';
import IsubcriptionRepository from '../interfaces/IsubcriptionRepository';
import { subcriptionRepository } from '../repositories/subcriptionRepository';
const router = Router();


const SubcriptionRepository:IsubcriptionRepository = new subcriptionRepository()
const SubcriptionService:Isubcriptionservice = new subcriptionService(SubcriptionRepository)
const SubcriptionController = new subcriptionController(SubcriptionService)

router.get('/get-subcriptionDetails',SubcriptionController.getSubscriptionDetails)
router.post('/create-checkout-session',SubcriptionController.createCheckoutSession)
router.post('/customer-portal-session',SubcriptionController.createCustomerPortalSession)
router.get('/payment-history',SubcriptionController.getPaymentHistory)
router.get('/All-payment-history',SubcriptionController.getAllPaymentHistory)

export default router;
