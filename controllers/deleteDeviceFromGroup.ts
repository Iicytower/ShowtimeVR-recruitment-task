import { Request, Response } from 'express';
import { deleteDevice } from '../database/queries/groups';
import { DeleteDeviceFromGroupRequestBody, ErrorMessages, Group } from '../helpers/models';

export async function deleteDeviceFromGroup(req: Request, res: Response) {
  const reqBody: DeleteDeviceFromGroupRequestBody = req.body;

  const response: Group[] | string = await deleteDevice(reqBody);

  if (typeof response === 'string' && response !== ErrorMessages.unhandledException) {
    return res.status(404).json(response);
  }

  if (response !== ErrorMessages.unhandledException) {
    return res.status(200).json(response);
  }

  return res.status(500).json(response);
}
