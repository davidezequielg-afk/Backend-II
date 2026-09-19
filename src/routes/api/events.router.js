import { Router } from 'express';
import { eventsController , createEventController , updateEventController} from '../../controllers/events.controller.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';


const routerEvent = Router();

routerEvent.get('/', eventsController);
routerEvent.post('/', authenticate, authorize('admin', 'organizer'), createEventController);
routerEvent.put('/:id', authenticate, authorize('admin', 'organizer'), updateEventController);


export default routerEvent;