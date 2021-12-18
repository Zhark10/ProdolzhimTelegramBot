
import { MessagesHandler } from "./src/handlers/MessagesHandler.js"
import { createDatabaseConnection } from "./src/config/db-connection.js"
import { bot } from "./src/config/bot-initialize.js"

const startBot = async () => {
  await createDatabaseConnection()
  return MessagesHandler(bot)
}

startBot()