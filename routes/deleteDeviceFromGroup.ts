import { deleteDeviceFromGroup } from "../controllers/deleteDeviceFromGroup";
import { Router } from 'express';
const router = Router();

router.delete('/delete', deleteDeviceFromGroup);

export { router };