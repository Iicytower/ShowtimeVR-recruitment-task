import { getFileList } from '../controllers/getFileList';
import { Router } from 'express';
const router = Router();

router.get('/get', getFileList);

export { router };
