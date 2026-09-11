import { Router } from 'express';
import passport from 'passport';
import { registerController } from '../../controllers/sessions.controller.js';
import { loginController } from '../../controllers/sessions.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { currentUserController } from '../../controllers/sessions.controller.js';
import { logoutController } from '../../controllers/sessions.controller.js';

const routerSession = Router();

routerSession.post('/register', passport.authenticate('register' , { session: false }), registerController);
routerSession.post('/login', passport.authenticate('login', { session: false }), loginController);
routerSession.post('/logout', logoutController);
routerSession.get('/current', passport.authenticate('current', { session: false, failWithError: true }), currentUserController);

export default routerSession;