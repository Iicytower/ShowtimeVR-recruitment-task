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
}

export type FilesListQuery = {
  groupIds?: string;
  groupNames?: string;
};
