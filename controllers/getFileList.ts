import { Request, Response } from 'express';
import { getFilesList } from '../database/queries/devices';
import { pullGroups } from '../database/queries/groups';
import { ErrorMessages, FilesListQuery, Group } from '../helpers/models';

export async function getFileList(req: Request, res: Response) {
  const { groupIds, groupNames }: FilesListQuery = req.query;

  let groupIdsSplitted: number[];
  if (groupIds) {
    groupIdsSplitted = groupIds.split(',').map((el) => Number(el));
  }

  let groupNamesSplitted: string[];
  if (groupNames) {
    groupNamesSplitted = groupNames.split(',').map((el) => el);
  }

  const groups: Group[] = await pullGroups();

  //TODO
  //@ts-ignore
  const devices: number[] = groups
    .map(({ id, name, devices }: Group) => {
      if (groupIds && groupIdsSplitted.includes(id)) {
        return devices;
      }
      if (groupNames && groupNamesSplitted.includes(name)) {
        return devices;
      }
    })
    .filter((el) => el)
    .flat();

  const uniqueDevices: number[] = [...new Set(devices)];

  const filesList = await getFilesList(uniqueDevices);

  if (filesList.length === 0) {
    return res.status(204);
  }

  if (filesList.length > 0) {
    return res.status(200).json({
      msg: 'files list is following',
      filesList,
    });
  }

  return res.status(500).json(ErrorMessages.unhandledException);
}
