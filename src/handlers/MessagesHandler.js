import { CommandService } from "../services/CommandService.js"
import { CONSTANTS } from "../config/constants.js"

const { COMMANDS, DEFAULT_COMMANDS } = CONSTANTS

export const MessagesHandler = async (bot, db) => {
  bot.setMyCommands(DEFAULT_COMMANDS)
  const commandService = new CommandService(bot, db)

  bot.on("message", async (msg) => {
    const text = msg.text
    const actions = {
      [COMMANDS.start]: commandService.start,
      [COMMANDS.create]: commandService.create,
      [COMMANDS.continue]: commandService.continue,
    }

    const foundCommand = Object.values(COMMANDS).find(com => text.includes(com))
    const definedAction = actions[foundCommand] || commandService.throwDefaultCase
    return definedAction(msg)
  })
}