import { Request, Response } from 'express';
import { AddDeviceToGroupRequestBody, ErrorMessages, Group } from '../helpers/models';
import { addDevice } from '../database/queries/groups';

export async function addDeviceToGroup(req: Request, res: Response) {
  const reqBody: AddDeviceToGroupRequestBody = req.body;

  const response: Group[] | string = await addDevice(reqBody);

  if (typeof response === 'string' && response !== ErrorMessages.unhandledException) {
    return res.status(404).json(response);
  }

  if (response !== ErrorMessages.unhandledException) {
    return res.status(200).json(response);
  }

  return res.status(500).json(response);
}
