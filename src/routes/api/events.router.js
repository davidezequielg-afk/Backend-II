import { Router } from 'express';
import { eventsController , createEventController , updateEventController, getEventController, updateEventStatusController } from '../../controllers/events.controller.js';
import { createTicketController, getEventTicketsController } from '../../controllers/tickets.controller.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';


const routerEvent = Router();

routerEvent.get('/', eventsController);
routerEvent.post('/', authenticate, authorize('admin', 'organizer'), createEventController);
routerEvent.put('/:id', authenticate, authorize('admin', 'organizer'), updateEventController);
routerEvent.patch('/:id/status', authenticate, authorize('admin', 'organizer'), updateEventStatusController);
routerEvent.get('/:id', getEventController);

routerEvent.post('/:eventId/tickets', authenticate, createTicketController);
routerEvent.get('/:eventId/tickets', authenticate, authorize('admin', 'organizer'), getEventTicketsController);

export default routerEvent;