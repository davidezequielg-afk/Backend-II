import { Router } from 'express';
import { eventsController } from '../../controllers/events.controller.js';

const routerEvent = Router();

routerEvent.get('/', eventsController);

export default routerEvent;