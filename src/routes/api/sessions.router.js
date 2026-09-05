import { Router } from 'express';
import { registerController } from '../../controllers/sessions.controller.js';
import { loginController } from '../../controllers/sessions.controller.js';


const routerSession = Router();

routerSession.post('/register', registerController);
routerSession.post('/login', loginController);

export default routerSession;