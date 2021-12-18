const SEPARATOR_TO_CREATE_UNIQUE_COMMAND = "__"

const DATABASE_COLLECTIONS = {
  STORIES: "stories"
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
  DATABASE_COLLECTIONS,
  SEPARATOR_TO_CREATE_UNIQUE_COMMAND,
  ALL_COMMANDS,
  MENU_COMMANDS,
}