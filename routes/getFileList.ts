import { getFileList } from '../controllers/getFileList';
import { Router } from 'express';
import { validator } from '../validators/getFilesListValidator';
const router = Router();

router.get('/getFiles', validator, getFileList);

export { router };
