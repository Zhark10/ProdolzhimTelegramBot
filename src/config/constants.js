const SEPARATOR_TO_CREATE_UNIQUE_COMMAND = "__"

const TOKENS = {
  MONGO_DB: process.env.MONGO_DB_CONNECTION_URL,
  TELEGRAM_BOT: process.env.TELEGRAM_BOT
}

const ALL_COMMANDS = {
  start: "/start",
  create: "/create",
  continue: `/continue${SEPARATOR_TO_CREATE_UNIQUE_COMMAND}`,
}

const MENU_COMMANDS = [
  { command: ALL_COMMANDS.start, description: "Приветствие" },
  { command: ALL_COMMANDS.create, description: "Создать историю" },
]

export const CONSTANTS = {
  TOKENS,
  SEPARATOR_TO_CREATE_UNIQUE_COMMAND,
  ALL_COMMANDS,
  MENU_COMMANDS,
}