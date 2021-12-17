import { join, dirname } from "path"
import { Low, JSONFile } from "lowdb"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url));

let db;

const defaultDatabaseState = {
  histories: []
}

const createDatabaseConnection = async () => {
  const file = join(__dirname, "db.json")
  const adapter = new JSONFile(file)
  db = await new Low(adapter)
  db.data ||= defaultDatabaseState
  db.read()
  return db
}

const getConnection = () => db

export {
  createDatabaseConnection,
  getConnection,
}