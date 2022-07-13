import { AddDeviceToGroupRequestBody, DeleteDeviceFromGroupRequestBody, ErrorMessages, Group } from "../../helpers/models";
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
    db.push(`/groups[${groups.length}]`, {
      id: item.groupId ?? Date.now(),
      name: String(item.groupName),
      devices: [item.deviceId],
    });
    return await pullGroups();
  }
  
  if(findedGroup && findedGroup.devices.includes(item.deviceId)){
    return `This group contain the device with id ${item.deviceId}.`
  }
  
  if(findedIndexGroup > -1){
    const devicesLength = groups[findedIndexGroup].devices.length;

    db.push(`/groups[${findedIndexGroup}]/devices[${devicesLength}]`, item.deviceId);
    return await pullGroups();
  }

  return ErrorMessages.unhandledException;

}

export async function deleteDevice(item: DeleteDeviceFromGroupRequestBody): Promise<Group[] | string> {
  
  const groups: Group[] = await pullGroups();

  const findedIndexGroup = groups.findIndex(({ id, name }) => item.groupId === id || item.groupName === name);
  const findedGroup = groups[findedIndexGroup];

  if(findedGroup && findedGroup.devices && !findedGroup.devices.includes(item.deviceId)){
    return `This group does not contain the device with id ${item.deviceId}.`
  }

  if(groups[findedIndexGroup].devices.length === 1){

    db.delete(`/groups[${findedIndexGroup}]`);
    return await pullGroups();

  } else if (groups[findedIndexGroup].devices.length > 1) {
    const deviceIndex = groups[findedIndexGroup].devices.findIndex(id => id === item.deviceId);
    
    db.delete(`/groups[${findedIndexGroup}]/devices[${deviceIndex}]`);
    return await pullGroups();

  }
  
  return ErrorMessages.unhandledException;

}