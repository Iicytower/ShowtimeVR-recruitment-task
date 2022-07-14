export type AddDeviceToGroupRequestBody = {
  deviceId: number;
  groupName?: string;
  groupId?: number;
};

export type DeleteDeviceFromGroupRequestBody = AddDeviceToGroupRequestBody;

export type Device = {
  id: number;
  files: string[];
};

export type Group = {
  id: number;
  name: string;
  devices: number[];
};

export enum ErrorMessages {
  UnhandledException = 'Unhandled exception.',
  PullDevices = '[ERROR] Problem with database. pullDevices()',
  PullDevicesIds = '[ERROR] Problem with database. pullDevicesIds()',
  GetFilesList = '[ERROR] Problem with database. getFilesList()',
  PullGroups = '[ERROR] Problem with database. pullGroups()',
  PullGroupsIds = '[ERROR] Problem with database. pullGroupsIds()',
  AddDevice = '[ERROR] Problem with database. addDevice()',
  DatabaseConnection = '[ERROR] Problem with database connection.',
  Validation = '[ERROR] Unhandled exception in validation.',
  AddDeviceToGroup = '[ERROR] Problem with add device controller.',
  DeleteDeviceFromGroup = '[ERROR] Problem with delete device controller.',
  GetUniqueFilesList = '[ERROR] Problem with get files list controller.',
}

export type FilesListQuery = {
  groupIds?: string;
  groupNames?: string;
};
