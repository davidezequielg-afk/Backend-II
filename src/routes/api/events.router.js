import { Router } from 'express';
import { eventsController } from '../../controllers/events.controller.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';


const routerEvent = Router();

routerEvent.get('/', eventsController);
routerEvent.post('/', authenticate, authorize('admin', 'organizer'), eventsController);

export default routerEvent;