import { filterFalsyValues } from "../../helpers/helpers";
import { Device, ErrorMessages } from "../../models";
import { db } from "../database";

export async function pullDevices(): Promise<Device[] | Error> {

  try {
    return await db.getData('/devices');
  } catch (error: unknown) {
    return new Error(ErrorMessages.PullDevices)
  }

}

export async function pullDevicesIds(): Promise<number[] | Error> {

  try {
    const devices = await pullDevices();
    if(devices instanceof Error){
      throw new Error(ErrorMessages.PullDevicesIds);
    }
    return devices.map((item: Device) => item.id);

  } catch (error: unknown) {
    if(error instanceof Error){
      return error;
    } else {
      return new Error(ErrorMessages.PullDevicesIds);
    }
  }

}

export async function getFilesList(devicesIds: number[]): Promise<string[] | Error> {

  try {
    const devices: Device[] | Error = await pullDevices();

    if(devices instanceof Error){
      throw new Error(ErrorMessages.GetFilesList)
    }
    
    const files: string[] = devices.flatMap(({id, files}) => {
  
      if(devicesIds.includes(id)){
        return files;
      }
  
    }).filter(filterFalsyValues);
  
    return [...new Set(files)];
  } catch (error) {
    if(error instanceof Error){
      return error;
    } else {
      return new Error(ErrorMessages.GetFilesList);
    }
  }
}