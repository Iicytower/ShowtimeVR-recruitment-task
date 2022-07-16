import { NextFunction, Request, Response } from 'express';
import { DeleteDeviceFromGroupRequestBody, ErrorMessages } from '../models';
import { checkSchema } from 'obj-valid';
import { pullDevicesIds } from '../database/queries/devices';
import { pullGroups } from '../database/queries/groups';

export async function deleteDeviceFromGroupValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const reqBody: DeleteDeviceFromGroupRequestBody = req.body;
  let doesBodyIsCorrect = true;

  if (reqBody.hasOwnProperty('groupName')) {
    const schema = {
      groupName: 'string',
      deviceId: 'number',
    };
    doesBodyIsCorrect = checkSchema(schema, reqBody).score;
  } else if (reqBody.hasOwnProperty('groupId')) {
    const schema = {
      groupId: 'number',
      deviceId: 'number',
    };
    doesBodyIsCorrect = checkSchema(schema, reqBody).score;
  } else {
    doesBodyIsCorrect = false;
  }

  if (!doesBodyIsCorrect) {
    return res.status(400).json({
      msg: 'Wrong request body structure.',
    });
  }

  try {
    const groups = await pullGroups();

    if (groups instanceof Error) {
      throw new Error(ErrorMessages.Validation);
    }

    const findedGroup = groups.find(
      ({ name, id }) => name === reqBody.groupName || id === reqBody.groupId,
    );

    if (!findedGroup) {
      return res.status(404).json({
        msg: reqBody.groupId
          ? `We do not have a group with id ${reqBody.groupId}`
          : `We do not have a group with name ${reqBody.groupName}`,
      });
    }

    const devices = await pullDevicesIds();

    if (devices instanceof Error) {
      throw new Error(ErrorMessages.Validation);
    }

    if (!devices.includes(reqBody.deviceId)) {
      return res.status(400).json({
        msg: 'We do not have such device id in the database.',
      });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json(ErrorMessages.UnhandledException);
  }
}
