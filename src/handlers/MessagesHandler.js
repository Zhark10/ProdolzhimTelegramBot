import { CommandController } from '../controllers/CommandController.js'
import { CONSTANTS } from '../config/constants.js'
import { findCommandByUserMessage } from '../utils/find-command-by-user-message.js'

const { ALL_COMMANDS, MENU_COMMANDS } = CONSTANTS

export const MessagesHandler = async (bot) => {
  bot.setMyCommands(MENU_COMMANDS)
  const commandController= new CommandController(bot)

  bot.on('message', async (message) => {
    const actions = {
      [ALL_COMMANDS.start]: commandController.start,
      [ALL_COMMANDS.create]: commandController.create,
      [ALL_COMMANDS.continue]: commandController.continue,
    }

    const foundCommand = findCommandByUserMessage(message.text)
    const definedAction =
      actions[foundCommand] || commandController.checkingNextHistoryVersion
    return definedAction(message)
  })
}
