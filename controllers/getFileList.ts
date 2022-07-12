import { Request, Response } from 'express';

export async function getFileList(req: Request, res: Response) {
  return res.end('getFileList controller');
}
