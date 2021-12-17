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
    const id = crypto.randomBytes(16).toString("hex");
    const historyExample = { 
      title: 'ДВА СТВОЛА', 
      category: 'Вестерн',
      text: 'ГЛАВА ПЕРВАЯ. Джо «Злой карлик» был достаточно высок для карлика, он любил пышногрудых дам и изрядно напивался в баре, запугивая бармена своим револьвером с нетипичным количеством слотов в рулетке. Их было два. У Джо был брат, по крайней мере, он так говорил, но об этом позже. Для начала необходимо сказать о том, что «Злым карликом» его прозвали не спроста.', 
      id 
    }
    const chatId = msg.chat.id
    await this.db.data
      .histories
      .push(historyExample)
      await this.bot.sendMessage(chatId, `${historyExample.category} «${historyExample.title}»`)
      return this.bot.sendMessage(chatId, `Чтобы продолжить историю, нажми на /continue${CONSTANTS.SEPARATOR_TO_CREATE_UNIQUE_COMMAND}${id}`)
  }

  continue = async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    const allHistories = this.db.data.histories

    const historyIdToSearching = text.split(CONSTANTS.SEPARATOR_TO_CREATE_UNIQUE_COMMAND)[1]
    const historyIndex = await allHistories.findIndex(history => history.id === historyIdToSearching)
    const isHistoryTextExist = allHistories[historyIndex]?.text
    if (isHistoryTextExist) {
      await this.bot.sendMessage(chatId, `Продолжим ${allHistories[historyIndex].category.toLowerCase()} «${allHistories[historyIndex].title}»? :) Скопируй полностью отрывок ниже и дополни следующим сообщением!`)
      return this.bot.sendMessage(chatId, allHistories[historyIndex].text)
    }
    return this.bot.sendMessage(chatId, "К сожалению, история не найдена:( Возможно, она была удалена автором.")
  }

  checkingNextHistoryVersion = async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    const allHistories = this.db.data.histories
    const historyIndex = await allHistories.findIndex(history => text.includes(history.text))
    const foundHistory = allHistories[historyIndex]
    if (foundHistory?.text) {
      foundHistory.text = text
      await this.bot.sendMessage(chatId, `Ееее, записано! Теперь перешли другу следующее сообщение`)
      return this.bot.sendMessage(chatId, `Гоу продолжим историю «${foundHistory.title}»! Просто нажми на t.me/Zhark10Bot и введи /continue${CONSTANTS.SEPARATOR_TO_CREATE_UNIQUE_COMMAND}${foundHistory.id}`)
    }
    return this.bot.sendMessage(chatId, "Извини, но я тебя не понимаю!")
  }
}