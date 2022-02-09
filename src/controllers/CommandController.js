import pkg from 'node-emoji'

import { CONSTANTS } from '../config/constants.js'
import { storyExample } from '../models/StoryExample.js'
import { Story } from '../models/Story.js'
import { User } from '../models/User.js'
import { getFactStepSize } from '../utils/get-fact-step-size.js'
import { CommandService } from '../services/CommandService.js'
import { TemplateService } from '../services/TemplateService.js'

const { emoji } = pkg

const { SEPARATOR_TO_CREATE_UNIQUE_COMMAND } = CONSTANTS

export class CommandController {
  constructor(bot) {
    this.bot = bot
    this.commandService = new CommandService(bot)
    this.templateService = new TemplateService()
  }

  start = async (msg) => {
    const chatId = msg.chat.id
    const user = await this.commandService.findUserByMessage(msg)
    if (!user) await User.create(user)

    const message = `Привет, ${msg.from.first_name} ${msg.from.last_name}${emoji.v} Добро пожаловать в "Продолжим?"`
    const picture = await this.templateService.createTemplateForSimpleMessage(
      message
    )
    return this.bot.sendPhoto(chatId, picture)
  }

  create = async (msg) => {
    const chatId = msg.chat.id
    const createdStory = await Story.create(storyExample)
    await User.updateOne(
      { firstname: msg.from.first_name, lastname: msg.from.last_name },
      { currentHistoryId: createdStory._id }
    )

    const messageQueue = [
      `${storyExample.category} «${storyExample.title}»`,
      `Чтобы продолжить историю, нажми на /continue${SEPARATOR_TO_CREATE_UNIQUE_COMMAND}${createdStory._id}`,
    ]
    return this.commandService.sendMessageQueue(chatId, messageQueue)
  }

  continue = async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    const historyIdToSearching = text.split(
      SEPARATOR_TO_CREATE_UNIQUE_COMMAND
    )[1]
    await User.updateOne(
      { firstname: msg.from.first_name, lastname: msg.from.last_name },
      { currentHistoryId: historyIdToSearching }
    )

    const foundStory = await Story.findById(historyIdToSearching)
    if (foundStory) {
      const messageQueue = [
        `Продолжим ${foundStory.category.toLowerCase()} «${
          foundStory.title
        }»? :) Скопируй полностью отрывок ниже и дополни следующим сообщением!`,
        foundStory.text,
      ]

      return this.commandService.sendMessageQueue(chatId, messageQueue)
    }

    const message =
      'К сожалению, история не найдена:( Возможно, она была удалена автором.'
    return this.bot.sendMessage(chatId, message)
  }

  checkingNextHistoryVersion = async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id

    const currentUser = await this.commandService.findUserByMessage(msg)
    if (!currentUser?.currentHistoryId)
      return this.bot.sendMessage(chatId, 'Извини, но я тебя не понимаю!')

    const foundStory = await Story.findById(currentUser.currentHistoryId).exec()

    if (!foundStory) return

    if (!text.includes(foundStory.text)) {
      const message = `Нее, так не пойдет${emoji.exclamation} Ты не можешь переписывать предыдущую часть...`
      return this.bot.sendMessage(chatId, message)
    }
    if (getFactStepSize(text, foundStory.text) > foundStory.stepSize) {
      const message = `К сожалению, твой отрывок превышает допустимый лимит (${foundStory.stepSize} слов), который задал автор!`
      return this.bot.sendMessage(chatId, message)
    }
    await Story.updateOne({ _id: foundStory._id }, { text })

    const messagesQueue = [
      `Ееее, записано ${emoji.writing_hand} Ты просто космос${emoji.sparkles} Теперь перешли другу следующее сообщение:`,
      `Гоу продолжим ${foundStory.category} «${foundStory.title}»! Просто нажми на t.me/Zhark10Bot и введи /continue${SEPARATOR_TO_CREATE_UNIQUE_COMMAND}${foundStory._id}`,
    ]
    return this.commandService.sendMessageQueue(chatId, messagesQueue)
  }
}
