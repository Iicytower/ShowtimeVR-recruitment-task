import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { ErrorMessages } from '../helpers/models';

function configDatabase() {
  try {
    const db = new JsonDB(new Config('./database/db.json', true, true, '/'));

    return db;
  } catch (error) {
    console.error(ErrorMessages.databaseConnection);
    console.error(error);
    process.exit(1);
  }
}

const db = configDatabase();

export { db };
