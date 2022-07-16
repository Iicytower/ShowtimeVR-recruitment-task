import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { ErrorMessages } from '../models';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { isJsonStringCorrect } from '../helpers/helpers';

function configDatabase() {
  const dbFilePath = `${__dirname}/db.json`;
  const exampleStartDataPath = `${__dirname}/exampleStartData.json`;
  try {
    if (!existsSync(dbFilePath)) {
      const exampleStartData = existsSync(exampleStartDataPath)
        ? readFileSync(exampleStartDataPath, 'utf-8')
        : 'wrongJsonStructure';

      if (!isJsonStringCorrect(exampleStartData)) {
        throw new Error(ErrorMessages.LackDatabase);
      }
      writeFileSync(dbFilePath, exampleStartData, 'utf-8');
    }

    const db = new JsonDB(new Config(dbFilePath, true, true, '/'));

    return db;
  } catch (error) {
    console.error(ErrorMessages.DatabaseConnection);
    console.error(error);
    process.exit(1);
  }
}

const db = configDatabase();

export { db };
