const SEPARATOR_TO_CREATE_UNIQUE_COMMAND = "__"
const MIN_START_HISTORY_SIZE = 30

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
  SEPARATOR_TO_CREATE_UNIQUE_COMMAND,
  ALL_COMMANDS,
  MENU_COMMANDS,
  MIN_START_HISTORY_SIZE,
}