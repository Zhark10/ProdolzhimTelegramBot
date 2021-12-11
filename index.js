
import TelegramApi from 'node-telegram-bot-api';
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

let db;

const defaultDatabaseState = {
  histories: []
}

export async function createConnection() {
  const file = join(__dirname, 'db.json')
  const adapter = new JSONFile(file)
  db = await new Low(adapter)
  db.data ||= defaultDatabaseState
  db.read()
}

export const getConnetcion = () => db
createConnection()

const token = '5035331349:AAHG-3mOMX0gu-1X0bDA31PxTXGQ1akhn1E'

const bot = new TelegramApi(token, { polling: true })

const start = () => {

  bot.setMyCommands(
    [
      { command: '/start', description: 'Приветствие' },
      { command: '/create', description: 'Создать историю' },
    ]
  )

  bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === "/start") {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/e1f/4c4/e1f4c48a-c808-37a7-a037-bfa58e8b3222/1.webp')
      return bot.sendMessage(chatId, `Привет, ${msg.from.first_name} ${msg.from.last_name}! Добро пожаловать в "Продолжим?"`)
    }

    if (text.includes("/continue-")) {
      const storyId = text.split("-")[1]
      await bot.sendMessage(chatId, storyId || 'Извините, но история не найдена')
    }

    return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй объяснить еще раз!`)
  })
}

start()