import { NextFunction, Request, Response } from 'express';
import { AddDeviceToGroupRequestBody } from '../helpers/models';
import { checkSchema } from "obj-valid";

export function validator(req: Request, res: Response, next: NextFunction) {

  const reqBody: AddDeviceToGroupRequestBody = req.body;
  let doesBodyIsCorrect = true;

  if(reqBody.hasOwnProperty('groupName')){

    const schema = {
      groupName: "string",
      deviceId: "number",
    };
    doesBodyIsCorrect = checkSchema(schema, reqBody).score;

  } else if (reqBody.hasOwnProperty('groupId')) {

    const schema = {
      groupId: "number",
      deviceId: "number",
    };
    doesBodyIsCorrect = checkSchema(schema, reqBody).score;

  } else {
    doesBodyIsCorrect = false;
  }
  
  if (!doesBodyIsCorrect) {
    return res.status(404).json({
      msg: "Wrong request body structure."
    });
  }

  next();

}