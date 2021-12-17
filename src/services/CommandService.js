export class CommandService {
  constructor(bot, db) {
    this.bot = bot
    this.db = db
  }

  start = async (msg) => {
    const chatId = msg.chat.id
    await this.bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/e1f/4c4/e1f4c48a-c808-37a7-a037-bfa58e8b3222/1.webp")
    return this.bot.sendMessage(chatId, `Привет, ${msg.from.first_name} ${msg.from.last_name}! Добро пожаловать в "Продолжим?"`)
  }

  create = async (msg) => {
    await this.db.data
      .histories
      .push({ title: 'Новая история', text: 'История начинается, когда', id: 1 })
  }

  continue = async (msg) => {
    const text = msg.text
    const storyId = text.split("-")[1]
    const chatId = msg.chat.id
    return this.bot.sendMessage(chatId, storyId || "Извините, но история не найдена")
  }

  throwDefaultCase = async(msg) => {
    const chatId = msg.chat.id
    return this.bot.sendMessage(chatId, `Я тебя не понимаю, попробуй объяснить еще раз!`)
  }
}