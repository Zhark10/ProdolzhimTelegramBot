import { User } from '../models/User.js'
import { TemplateService } from '../services/TemplateService.js'

export class CommandService {
  constructor(bot) {
    this.bot = bot
    this.templateService = new TemplateService()
  }

  sendMessageQueue = async (chatId, messageQueue) => {
    return messageQueue.forEach(async (message) => {
      return this.bot.sendMessage(chatId, message)
    })
  }

  sendStyledMessageQueue = async (chatId, messageQueue) => {
    return messageQueue.forEach(async (message) => {
      const picture = await this.templateService.createTemplateForSimpleMessage(message)
      return this.bot.sendPhoto(chatId, picture)
    })
  }

  findUserByMessage = async msg => {
    return User.findOne({
      firstname: msg.from.first_name,
      lastname: msg.from.last_name,
    }).exec()
  }
}
