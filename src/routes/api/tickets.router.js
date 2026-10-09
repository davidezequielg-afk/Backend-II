import { Router } from 'express';
import { cancelTicketController, getMyTicketsController } from '../../controllers/tickets.controller.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const routerTicket = Router();

routerTicket.get('/my-tickets', authenticate, getMyTicketsController);
routerTicket.patch('/:ticketId/cancel', authenticate, authorize('admin', 'organizer'), cancelTicketController);

export default routerTicket;