interface AddDeviceToGroupRequestBodyBase {
  deviceId: number;
}

interface AddDeviceToGroupRequestBodyWithName extends AddDeviceToGroupRequestBodyBase {
  groupName: string;
}

interface AddDeviceToGroupRequestBodyWithId extends AddDeviceToGroupRequestBodyBase {
  groupId: number;
}

export type AddDeviceToGroupRequestBody =
  | AddDeviceToGroupRequestBodyWithName
  | AddDeviceToGroupRequestBodyWithId;

export type Device = {
  id: number;
  files: string[];
};

export type Group = {
  id: number;
  name: string;
  devices: number[];
};
