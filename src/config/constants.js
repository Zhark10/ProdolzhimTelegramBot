const COMMANDS = {
  start: "/start",
  create: "/create",
  continue: "/continue-",
}

const DEFAULT_COMMANDS = [
  { command: COMMANDS.start, description: "Приветствие" },
  { command: COMMANDS.create, description: "Создать историю" },
]

export const CONSTANTS = {
  COMMANDS,
  DEFAULT_COMMANDS
}