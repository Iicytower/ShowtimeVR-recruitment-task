import { addDeviceToGroup } from "../controllers/addDeviceToGroup";
import { Router } from 'express';
const router = Router();

router.post('/add', addDeviceToGroup);

export { router };