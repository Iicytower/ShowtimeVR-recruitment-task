import { getUniqueFileListCtrl } from '../controllers/getUniqueFileListCtrl';
import { Router } from 'express';
import { validator } from '../validators/getFilesListValidator';
const router = Router();

router.get('/getFiles', validator, getUniqueFileListCtrl);

export { router };
