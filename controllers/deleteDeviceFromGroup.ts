import { Request, Response } from 'express';
import { deleteDevice } from '../database/queries/groups';
import { DeleteDeviceFromGroupRequestBody, ErrorMessages, Group } from '../helpers/models';

export async function deleteDeviceFromGroup(req: Request, res: Response) {
  const reqBody: DeleteDeviceFromGroupRequestBody = req.body;
  try {
    const response: Group[] | string | Error = await deleteDevice(reqBody);

    if (response instanceof Error) {
      throw new Error(ErrorMessages.DeleteDeviceFromGroup);
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
    return res.status(500).json(ErrorMessages.DeleteDeviceFromGroup);
  }
}
