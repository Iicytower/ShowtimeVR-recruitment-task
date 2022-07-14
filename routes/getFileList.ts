import { getUniqueFileList } from '../controllers/getUniqueFileList';
import { Router } from 'express';
import { validator } from '../validators/getFilesListValidator';
const router = Router();

router.get('/getFiles', validator, getUniqueFileList);

export { router };
