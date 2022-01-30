
import dotenv from 'dotenv'
import path from 'path';
const __dirname = path.resolve();

const SEPARATOR_TO_CREATE_UNIQUE_COMMAND = "__"

if (process.env.NODE_ENV) {
  dotenv.config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`
  })
} else {
  dotenv.config()
}

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