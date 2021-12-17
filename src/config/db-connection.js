import { join, dirname } from "path"
import { Low, JSONFile } from "lowdb"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url));

let database;

const defaultDatabaseState = {
  histories: []
}

const createDatabaseConnection = async () => {
  const file = join(__dirname, "db.json")
  const adapter = new JSONFile(file)
  database = await new Low(adapter)
  database.data ||= defaultDatabaseState
  database.read()
  return database
}

const getConnection = () => database

export {
  createDatabaseConnection,
  getConnection,
}