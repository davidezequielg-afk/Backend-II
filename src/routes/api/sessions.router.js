import { Router } from 'express';
import passport from 'passport';
import { registerController } from '../../controllers/sessions.controller.js';
import { loginController } from '../../controllers/sessions.controller.js';
import { currentUserController } from '../../controllers/sessions.controller.js';
import { logoutController } from '../../controllers/sessions.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validateCredentials } from '../../middlewares/validate-credentials.middleware.js';

const routerSession = Router();

routerSession.post('/register', validateCredentials, passport.authenticate('register' , { session: false }), registerController);
routerSession.post('/login', validateCredentials, passport.authenticate('login', { session: false }), loginController);
routerSession.post('/logout', logoutController);
routerSession.get('/current', authenticate, currentUserController);


export default routerSession;