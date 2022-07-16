import { Router } from 'express';
import { addDeviceToGroupCtrl } from '../controllers/addDeviceToGroupCtrl';
import { deleteDeviceFromGroupCtrl } from '../controllers/deleteDeviceFromGroupCtrl';
import { getUniqueFileListCtrl } from '../controllers/getUniqueFileListCtrl';
import {
  addDeviceToGroupValidator,
  deleteDeviceFromGroupValidator,
  getFilesListValidator,
} from '../validators/indexValidators';

const router = Router();

router.post('/addDeviceToGroup', addDeviceToGroupValidator, addDeviceToGroupCtrl);
router.delete('/deleteDeviceFromGroup', deleteDeviceFromGroupValidator, deleteDeviceFromGroupCtrl);
router.get('/getFilesList', getFilesListValidator, getUniqueFileListCtrl);

export { router };
