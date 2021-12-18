import { MongoClient } from "mongodb"
import { CONSTANTS } from "./constants.js"

const CONNECTION_URL = 'mongodb+srv://Zhark10:d0uLwSXC7yqg8Vga@clusterforprodolzhim.5stig.mongodb.net/ClusterForProdolzhim?retryWrites=true&w=majority'
const client = new MongoClient(CONNECTION_URL)

const setCollections = async (client, collections) => {
  const database = client.db()
  for (let collectionName of Object.values(collections)) {
    const thisCollectionAlreadyExist = await database.collection(collectionName)
    if (!thisCollectionAlreadyExist) {
      database.createCollection(collectionName)
    }
  }
}

const createDatabaseConnection = async () => {
  try {
    await client.connect()
    await setCollections(client, CONSTANTS.DATABASE_COLLECTIONS)
    console.log('Connection is successful')
    return client
  } catch (error) {
    console.error('Connection error', error)
  }
}

export {
  createDatabaseConnection
}