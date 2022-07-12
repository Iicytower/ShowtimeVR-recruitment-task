import { Router} from 'express';
import { validator } from "../validators/addDeviceToGroupValidator";

import { addDeviceToGroup } from "../controllers/addDeviceToGroup";
const router = Router();

router.post('/add', validator, addDeviceToGroup);

export { router };