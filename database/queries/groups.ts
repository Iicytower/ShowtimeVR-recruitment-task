import { AddDeviceToGroupRequestBody, DeleteDeviceFromGroup, ErrorMessages, Group } from "../../helpers/models";
import { db } from "../database";

export async function pullGroups(): Promise<Group[]> {
  return await db.getData('/groups');
}

export async function pullGroupsIds(): Promise<number[]> {
  return (await pullGroups()).map((item: Group) => item.id);
}

export async function addDevice(item: AddDeviceToGroupRequestBody): Promise<Group[] | string> {
  
  const groups: Group[] = await pullGroups();
  
  const findedIndexGroup = groups.findIndex(({ id, name }) => item.groupId === id || item.groupName === name);
  const findedGroup = groups[findedIndexGroup];

  if (findedIndexGroup === -1 && !item.hasOwnProperty('groupName')){
    return `We do not have group with id ${item.groupId}. Please send request with groupName property`
  }

  if(findedIndexGroup === -1) {
    groups.push({
      id: item.groupId ?? Date.now(),
      name: String(item.groupName),
      devices: [item.deviceId],
    });
    db.push('/groups', groups);
    return groups;
  }
  
  if(findedGroup && findedGroup.devices.includes(item.deviceId)){
    return `This group contain the device with id ${item.deviceId}.`
  }
  
  if(findedIndexGroup > -1){
    groups[findedIndexGroup].devices.push(item.deviceId);
    db.push('/groups', groups);
    return groups;
  }

  return ErrorMessages.unhandledException;

}

export async function deleteDevice(item: DeleteDeviceFromGroup): Promise<Group[] | string> {
  
  return 'placeholder';
}