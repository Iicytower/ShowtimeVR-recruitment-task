import { Device } from "../../helpers/models";
import { db } from "../database";

export async function pullDevicesIds() {

  return await db.getData('/devices').map((item: Device) => item.id);

}