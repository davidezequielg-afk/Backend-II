import { Router } from 'express';
import { sessionsController } from '../../controllers/sessions.controller.js';

const routerSession = Router();

routerSession.get('/', sessionsController);

export default routerSession;