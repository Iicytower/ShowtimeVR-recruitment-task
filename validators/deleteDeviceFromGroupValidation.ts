import { NextFunction, Request, Response } from 'express';
import { DeleteDeviceFromGroupRequestBody } from '../helpers/models';
import { checkSchema } from 'obj-valid';
import { pullDevicesIds } from '../database/queries/devices';
import { pullGroups } from '../database/queries/groups';

export async function validator(req: Request, res: Response, next: NextFunction) {
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
    return res.status(404).json({
      msg: 'Wrong request body structure.',
    });
  }

  const groups = await pullGroups();

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

  if (!devices.includes(reqBody.deviceId)) {
    return res.status(404).json({
      msg: 'We do not have such device id in the database.',
    });
  }

  return next();
}
