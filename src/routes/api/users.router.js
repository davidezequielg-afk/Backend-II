import { getAllUsersController } from "../../controllers/user.controller";
import authenticate from "../../middlewares/auth.middleware";
import authorize from "../../middlewares/role.middleware";

routerUser.get('/', authenticate, authorize('admin'), getAllUsersController);

export default routerUser;