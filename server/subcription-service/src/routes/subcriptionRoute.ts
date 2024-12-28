import { Router } from 'express';
import { subcriptionController } from '../controllers/subcriptionController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const SubcriptionController = new subcriptionController()

router.post('/webhook', SubcriptionController.webhook);
router.get('/get-subcriptionDetails',(authenticate as never),SubcriptionController.getSubscriptionDetails)
router.post('/create-checkout-session',(authenticate as never),SubcriptionController.createCheckoutSession)
router.post('/customer-portal-session',(authenticate as never),SubcriptionController.createCustomerPortalSession)
router.get('/payment-history',(authenticate as never),SubcriptionController.getPaymentHistory)
router.get('/All-payment-history',(authenticate as never),SubcriptionController.getAllPaymentHistory)

export default router;
