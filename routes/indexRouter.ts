import { Router } from 'express';
import { router as addDeviceToGroupRouter } from "./addDeviceToGroup";
import { router as deleteDeviceFromGroup } from './deleteDeviceFromGroup';
import { router as getFileList } from './getFileList';

const router = Router();

router.use('/api', addDeviceToGroupRouter);
router.use('/api', deleteDeviceFromGroup);
router.use('/api', getFileList);

export { router };