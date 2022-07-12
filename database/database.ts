import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

async function configDatabase() {
  
  const db = new JsonDB(new Config("./database/db.json", true, true, '/'));

  return db;
}

const db = configDatabase();

export { db };