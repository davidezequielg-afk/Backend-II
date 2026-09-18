import { Router } from 'express';
import passport from 'passport';
import { registerController } from '../../controllers/sessions.controller.js';
import { loginController } from '../../controllers/sessions.controller.js';
import { currentUserController } from '../../controllers/sessions.controller.js';
import { logoutController } from '../../controllers/sessions.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import routerEvent from './events.router.js';
import { eventsController } from '../../controllers/events.controller.js';

const routerSession = Router();

routerSession.post('/register', passport.authenticate('register' , { session: false }), registerController);
routerSession.post('/login', passport.authenticate('login', { session: false }), loginController);
routerSession.post('/logout', logoutController);
routerSession.get('/current', authenticate, currentUserController);
routerEvent.get('/', eventsController);
routerEvent.post('/', authenticate, authorize('admin', 'organizer'), eventsController);

export default routerSession;