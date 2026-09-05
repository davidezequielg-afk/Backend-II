import { Router } from 'express';
import { registerController } from '../../controllers/sessions.controller.js';
import { loginController } from '../../controllers/sessions.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { currentUserController } from '../../controllers/sessions.controller.js';

const routerSession = Router();

routerSession.post('/register', registerController);
routerSession.post('/login', loginController);
routerSession.get('/current', authMiddleware, currentUserController);

export default routerSession;