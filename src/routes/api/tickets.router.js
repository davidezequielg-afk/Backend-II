import { Router } from 'express';
import { cancelTicketController, getMyTicketsController } from '../../controllers/tickets.controller.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/my-tickets', authenticate, getMyTicketsController);
router.patch('/:ticketId/cancel', authenticate, authorize, cancelTicketController);

export default router;