import { CommandService } from "../services/CommandService.js"
import { CONSTANTS } from "../config/constants.js"
import { findCommandByUserMessage } from "../utils/find-command-by-user-message.js"

const { ALL_COMMANDS, MENU_COMMANDS } = CONSTANTS

export const MessagesHandler = async (bot, db) => {
  bot.setMyCommands(MENU_COMMANDS)
  const commandService = new CommandService(bot, db)

  bot.on("message", async (message) => {
    const actions = {
      [ALL_COMMANDS.start]: commandService.start,
      [ALL_COMMANDS.create]: commandService.create,
      [ALL_COMMANDS.continue]: commandService.continue,
    }

    const foundCommand = findCommandByUserMessage(message.text)
    const definedAction = actions[foundCommand] || commandService.checkingNextHistoryVersion
    return definedAction(message)
  })
}