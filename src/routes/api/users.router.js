import { Router } from "express";
import { getAllUsersController } from "../../controllers/user.controller.js";
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';

const routerUser = Router();

routerUser.get('/', authenticate, authorize('admin'), getAllUsersController);

export default routerUser;