import { Group } from "../../helpers/models";
import { db } from "../database";

export async function pullGroupsIds() {

  return await db.getData('/groups').map((item: Group) => item.id);

}