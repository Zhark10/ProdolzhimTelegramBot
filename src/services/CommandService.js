import { CONSTANTS } from "../config/constants.js"
import crypto from "crypto";

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
    const chatId = msg.chat.id
    const id = crypto.randomBytes(16).toString("hex");
    await this.db.data
      .histories
      .push({ title: 'Новая история', text: 'История начинается, когда', id })
      return this.bot.sendMessage(chatId, `Чтобы продолжить историю, нажми на /continue${CONSTANTS.SEPARATOR_TO_CREATE_UNIQUE_COMMAND}${id}`)
  }

  continue = async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    const allHistories = this.db.data.histories

    const historyIdToSearching = text.split(CONSTANTS.SEPARATOR_TO_CREATE_UNIQUE_COMMAND)[1]
    const historyIndex = await allHistories.findIndex(history => history.id === historyIdToSearching)
    if (allHistories[historyIndex]?.text) {
      allHistories[historyIndex].text = allHistories[historyIndex].text + text
      return this.bot.sendMessage(chatId, allHistories[historyIndex].text)
    }
    return this.bot.sendMessage(chatId, "Не удалось дополнить историю")
  }

  throwDefaultCase = async (msg) => {
    const chatId = msg.chat.id
    return this.bot.sendMessage(chatId, `Я тебя не понимаю, попробуй объяснить еще раз!`)
  }
}