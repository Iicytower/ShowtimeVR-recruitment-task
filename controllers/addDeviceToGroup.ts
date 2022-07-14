import { Request, Response } from 'express';
import { AddDeviceToGroupRequestBody, ErrorMessages, Group } from '../helpers/models';
import { addDevice } from '../database/queries/groups';

export async function addDeviceToGroup(req: Request, res: Response) {
  const reqBody: AddDeviceToGroupRequestBody = req.body;
  try {
    const response: Group[] | string | Error = await addDevice(reqBody);

    if (response instanceof Error) {
      throw new Error(ErrorMessages.addDeviceToGroup);
    }

    if (typeof response === 'string' && response !== ErrorMessages.unhandledException) {
      return res.status(404).json(response);
    }

    if (response !== ErrorMessages.unhandledException) {
      return res.status(200).json(response);
    }

    return res.status(500).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json(ErrorMessages.addDeviceToGroup);
  }
}
