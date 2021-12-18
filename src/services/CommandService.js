import { CONSTANTS } from "../config/constants.js"

const { SEPARATOR_TO_CREATE_UNIQUE_COMMAND, DATABASE_COLLECTIONS } = CONSTANTS

export class CommandService {
  constructor(bot, client) {
    this.bot = bot
    this.client = client
  }

  start = async (msg) => {
    const chatId = msg.chat.id
    const db1 = await this.client.db().collection(DATABASE_COLLECTIONS.STORIES)

    console.log('DB', db1)

    await this.bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/e1f/4c4/e1f4c48a-c808-37a7-a037-bfa58e8b3222/1.webp")
    return this.bot.sendMessage(chatId, `Привет, ${msg.from.first_name} ${msg.from.last_name}! Добро пожаловать в "Продолжим?"`)
  }

  create = async (msg) => {
    const db = this.client.db()
    const historyExample = {
      title: 'ДВА СТВОЛА',
      category: 'Вестерн',
      text: 'ГЛАВА ПЕРВАЯ. Джо «Злой карлик» был достаточно высок для карлика, он любил пышногрудых дам и изрядно напивался в баре, запугивая бармена своим револьвером с нетипичным количеством слотов в рулетке. Их было два. У Джо был брат, по крайней мере, он так говорил, но об этом позже. Для начала необходимо сказать о том, что «Злым карликом» его прозвали не спроста.',
    }
    const chatId = msg.chat.id
    const insertedStoryMeta = await db.collection(DATABASE_COLLECTIONS.STORIES).insertOne(historyExample)
    await this.bot.sendMessage(chatId, `${historyExample.category} «${historyExample.title}»`)
    return this.bot.sendMessage(chatId, `Чтобы продолжить историю, нажми на /continue${SEPARATOR_TO_CREATE_UNIQUE_COMMAND}${insertedStoryMeta.insertedId}`)
  }

  continue = async (msg) => {
    const db = this.client.db()
    const text = msg.text
    const chatId = msg.chat.id
    const allStories = db.collection(DATABASE_COLLECTIONS.STORIES).find()
    const historyIdToSearching = text.split(SEPARATOR_TO_CREATE_UNIQUE_COMMAND)[1]

    const storyForContinue = db.collection(DATABASE_COLLECTIONS.STORIES).find({_id: historyIdToSearching})

    const isHistoryTextExist = storyForContinue?.text
    if (isHistoryTextExist) {
      await this.bot.sendMessage(chatId, `Продолжим ${storyForContinue.category.toLowerCase()} «${storyForContinue.title}»? :) Скопируй полностью отрывок ниже и дополни следующим сообщением!`)
      return this.bot.sendMessage(chatId, storyForContinue.text)
    }
    return this.bot.sendMessage(chatId, "К сожалению, история не найдена:( Возможно, она была удалена автором.")
  }

  checkingNextHistoryVersion = async (msg) => {
    const db = this.client.db()
    const text = msg.text
    const chatId = msg.chat.id
    const allStories = db.collection(DATABASE_COLLECTIONS.STORIES)
    const historyIndex = await allStories.findIndex(history => text.includes(history.text))
    const foundHistory = allStories[historyIndex]
    if (foundHistory?.text) {
      foundHistory.text = text
      await this.bot.sendMessage(chatId, `Ееее, записано! Теперь перешли другу следующее сообщение`)
      return this.bot.sendMessage(chatId, `Гоу продолжим историю «${foundHistory.title}»! Просто нажми на t.me/Zhark10Bot и введи /continue${SEPARATOR_TO_CREATE_UNIQUE_COMMAND}${foundHistory.id}`)
    }
    return this.bot.sendMessage(chatId, "Извини, но я тебя не понимаю!")
  }
}