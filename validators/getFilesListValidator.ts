import { NextFunction, Request, Response } from 'express';
import { FilesListQuery, Group } from '../helpers/models';
import { pullGroups } from '../database/queries/groups';

export async function validator(req: Request, res: Response, next: NextFunction) {
  const query: FilesListQuery = req.query;

  if (
    (!query.hasOwnProperty('groupNames') || !query.groupNames) &&
    (!query.hasOwnProperty('groupIds') || !query.groupIds)
  ) {
    return res.status(404).json({
      msg: 'Please provide query parameters groupNames and/or groupIds.',
    });
  }

  const { groupNames, groupIds } = query;

  const groups: Group[] = await pullGroups();

  if (groupIds) {
    const groupIdsSplitted = groupIds.split(',');

    for (const groupId of groupIdsSplitted) {
      if (!Number(groupId)) {
        return res.status(404).json({
          msg: `GroupId ${groupId} is not an integer.`,
        });
      }
    }

    const containsAll = groupIdsSplitted.every(
      (idFromRequest) => !!groups.find(({ id }) => id === Number(idFromRequest)),
    );

    if (!containsAll) {
      return res.status(404).json({
        msg: 'We do not have groups with provided ids. At least one.',
      });
    }
  }

  if (groupNames) {
    const groupNamesSplitted = groupNames.split(',');

    const containsAll = groupNamesSplitted.every(
      (nameFromRequest) => !!groups.find(({ name }) => name === nameFromRequest),
    );

    if (!containsAll) {
      return res.status(404).json({
        msg: 'We do not have groups with provided names. At least one.',
      });
    }
  }

  return next();
}