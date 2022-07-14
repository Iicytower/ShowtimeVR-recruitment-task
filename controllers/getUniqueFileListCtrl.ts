import { Request, Response } from 'express';
import { getFilesList } from '../database/queries/devices';
import { pullGroups } from '../database/queries/groups';
import { ErrorMessages, FilesListQuery, Group } from '../models';
import { filterFalsyValues } from '../helpers/helpers';

export async function getUniqueFileListCtrl(req: Request, res: Response) {
  const { groupIds, groupNames }: FilesListQuery = req.query;

  let groupIdsSplitted: number[];
  if (groupIds) {
    groupIdsSplitted = groupIds.split(',').map((el) => Number(el));
  }

  let groupNamesSplitted: string[];
  if (groupNames) {
    groupNamesSplitted = groupNames.split(',').map((el) => el);
  }

  try {
    const groups: Group[] | Error = await pullGroups();

    if (groups instanceof Error) {
      throw new Error(ErrorMessages.GetUniqueFilesList);
    }

    const devices: number[] = groups
      .flatMap(({ id, name, devices }: Group) => {
        if (groupIds && groupIdsSplitted.includes(id)) {
          return devices;
        }
        if (groupNames && groupNamesSplitted.includes(name)) {
          return devices;
        }
      })
      .filter(filterFalsyValues);

    const uniqueDevices: number[] = [...new Set(devices)];

    const filesList: string[] | Error = await getFilesList(uniqueDevices);

    if (filesList instanceof Error) {
      throw new Error(ErrorMessages.GetUniqueFilesList);
    }

    if (filesList.length === 0) {
      return res.status(204);
    }

    if (filesList.length > 0) {
      return res.status(200).json({
        msg: 'files list is following',
        filesList,
      });
    }

    return res.status(500).json(ErrorMessages.UnhandledException);
  } catch (error) {
    console.error(error);
    return res.status(500).json(ErrorMessages.GetUniqueFilesList);
  }
}
