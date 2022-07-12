interface AddDeviceToGroupRequestBodyBase {
  deviceId: number;
}

interface AddDeviceToGroupRequestBodyWithName extends AddDeviceToGroupRequestBodyBase {
  groupName: string;
}

interface AddDeviceToGroupRequestBodyWithId extends AddDeviceToGroupRequestBodyBase {
  groupId: number;
}

export type AddDeviceToGroupRequestBody = AddDeviceToGroupRequestBodyWithName | AddDeviceToGroupRequestBodyWithId