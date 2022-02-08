export class CommandServiceUtils {
  constructor(bot) {
    this.bot = bot
  }

  sendMessageQueue = async (chatId, messageQueue) => {
    return messageQueue.forEach(async (message) => {
      await this.bot.sendMessage(chatId, message)
    })
  }

  findUserByMessage = async msg => {
    return User.findOne({
      firstname: msg.from.first_name,
      lastname: msg.from.last_name,
    }).exec()
  }
}
