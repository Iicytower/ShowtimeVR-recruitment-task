import { deleteDeviceFromGroupCtrl } from '../controllers/deleteDeviceFromGroupCtrl';
import { Router } from 'express';
import { validator } from '../validators/deleteDeviceFromGroupValidator';
const router = Router();

router.delete('/delete', validator, deleteDeviceFromGroupCtrl);

export { router };
