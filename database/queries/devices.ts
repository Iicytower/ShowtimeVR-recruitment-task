import { Device } from "../../helpers/models";
import { db } from "../database";

export async function pullDevices(): Promise<Device[]> {

  return await db.getData('/devices');

}

export async function pullDevicesIds(): Promise<number[]> {

  return (await pullDevices()).map((item: Device) => item.id);

}