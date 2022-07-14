import { Router } from 'express';
import { validator } from '../validators/addDeviceToGroupValidator';

import { addDeviceToGroupCtrl } from '../controllers/addDeviceToGroupCtrl';
const router = Router();

router.post('/add', validator, addDeviceToGroupCtrl);

export { router };
