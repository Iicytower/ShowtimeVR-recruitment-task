import { deleteDeviceFromGroup } from '../controllers/deleteDeviceFromGroup';
import { Router } from 'express';
import { validator } from '../validators/deleteDeviceFromGroupValidation';
const router = Router();

router.delete('/delete', validator, deleteDeviceFromGroup);

export { router };
