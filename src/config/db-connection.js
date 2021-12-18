import mongoose from 'mongoose'

const CONNECTION_URL = 'mongodb+srv://Zhark10:d0uLwSXC7yqg8Vga@clusterforprodolzhim.5stig.mongodb.net/ClusterForProdolzhim?retryWrites=true&w=majority'

const createDatabaseConnection = async () => {
  try {
    await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connection is successful')
  } catch (error) {
    console.error('Connection error', error)
  }
}

export {
  createDatabaseConnection
}