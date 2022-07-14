import { filterFalsyValues } from "../../helpers/helpers";
import { Device } from "../../helpers/models";
import { db } from "../database";

export async function pullDevices(): Promise<Device[]> {

  return await db.getData('/devices');

}

export async function pullDevicesIds(): Promise<number[]> {

  return (await pullDevices()).map((item: Device) => item.id);

}

export async function getFilesList(devicesIds: number[]): Promise<string[]> {

  const devices: Device[] = await pullDevices();

  const files: string[] = devices.flatMap(({id, files}) => {

    if(devicesIds.includes(id)){
      return files;
    }

  }).filter(filterFalsyValues);

  return [...new Set(files)];

}