import pkg from 'node-emoji';

import { CONSTANTS } from "../config/constants.js"
import { storyExample } from '../models/StoryExample.js'
import { Story } from '../models/Story.js'
import { User } from '../models/User.js'
import { getFactStepSize } from '../utils/get-fact-step-size.js'

const { emoji } = pkg;

const { SEPARATOR_TO_CREATE_UNIQUE_COMMAND } = CONSTANTS

export class CommandService {
  constructor(bot) {
    this.bot = bot
  }

  start = async (msg) => {
    const chatId = msg.chat.id
    const isUserAlreadyExist = await User.findOne({ firstname: msg.from.first_name, lastname: msg.from.last_name }).exec();
    if (!isUserAlreadyExist) {
      await User.create({ firstname: msg.from.first_name, lastname: msg.from.last_name })
    }

    await this.bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/e1f/4c4/e1f4c48a-c808-37a7-a037-bfa58e8b3222/1.webp")
    return this.bot.sendMessage(chatId, `Привет, ${msg.from.first_name} ${msg.from.last_name}${emoji.v} Добро пожаловать в "Продолжим?"`)
  }

  create = async (msg) => {
    const chatId = msg.chat.id
    const createdStory = await Story.create(storyExample)
    await User.updateOne({ firstname: msg.from.first_name, lastname: msg.from.last_name }, { currentHistoryId: createdStory._id })
    await this.bot.sendMessage(chatId, `${storyExample.category} «${storyExample.title}»`)
    return this.bot.sendMessage(chatId, `Чтобы продолжить историю, нажми на /continue${SEPARATOR_TO_CREATE_UNIQUE_COMMAND}${createdStory._id}`)
  }

  continue = async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    const historyIdToSearching = text.split(SEPARATOR_TO_CREATE_UNIQUE_COMMAND)[1]
    await User.updateOne({ firstname: msg.from.first_name, lastname: msg.from.last_name }, { currentHistoryId: historyIdToSearching })

    const foundStory = await Story.findById(historyIdToSearching)
    if (foundStory) {
      await this.bot.sendMessage(chatId, `Продолжим ${foundStory.category.toLowerCase()} «${foundStory.title}»? :) Скопируй полностью отрывок ниже и дополни следующим сообщением!`)
      return this.bot.sendMessage(chatId, foundStory.text)
    }

    return this.bot.sendMessage(chatId, "К сожалению, история не найдена:( Возможно, она была удалена автором.")
  }

  checkingNextHistoryVersion = async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id

    const currentUser = await User.findOne({ firstname: msg.from.first_name, lastname: msg.from.last_name }).exec();
    if (!currentUser?.currentHistoryId) {
      return this.bot.sendMessage(chatId, "Извини, но я тебя не понимаю!")
    }

    const foundStory = await Story.findById(currentUser.currentHistoryId).exec();
    if (foundStory) {
      if (!text.includes(foundStory.text)) {
        return this.bot.sendMessage(chatId, `Нее, так не пойдет${emoji.exclamation} Ты не можешь переписывать предыдущую часть...`)
      }
      if (getFactStepSize(text, foundStory.text) > foundStory.stepSize) {
        return this.bot.sendMessage(chatId, `К сожалению, твой отрывок превышает допустимый лимит (${foundStory.stepSize} слов), который задал автор!`)
      }
      await Story.updateOne({ _id: foundStory._id }, { text })
      await this.bot.sendMessage(chatId, `Ееее, записано ${emoji.writing_hand} Ты просто космос${emoji.sparkles} Теперь перешли другу следующее сообщение:`)
      return this.bot.sendMessage(chatId, `Гоу продолжим ${foundStory.category} «${foundStory.title}»! Просто нажми на t.me/Zhark10Bot и введи /continue${SEPARATOR_TO_CREATE_UNIQUE_COMMAND}${foundStory._id}`)
    }
  }
}