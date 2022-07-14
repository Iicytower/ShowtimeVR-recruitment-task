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
  unhandledException = 'Unhandled exception.',
  pullDevices = '[ERROR] Problem with database. pullDevices()',
  pullDevicesIds = '[ERROR] Problem with database. pullDevicesIds()',
  getFilesList = '[ERROR] Problem with database. getFilesList()',
  pullGroups = '[ERROR] Problem with database. pullGroups()',
  pullGroupsIds = '[ERROR] Problem with database. pullGroupsIds()',
  addDevice = '[ERROR] Problem with database. addDevice()',
  databaseConnection = '[ERROR] Problem with database connection.',
  Validation = '[ERROR] Unhandled exception in validation.',
  addDeviceToGroup = '[ERROR] Problem with add device controller.',
  DeleteDeviceFromGroup = '[ERROR] Problem with delete device controller.',
  GetFilesList = '[ERROR] Problem with get files list controller.',
}

export type FilesListQuery = {
  groupIds?: string;
  groupNames?: string;
};
