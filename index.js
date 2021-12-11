
import TelegramApi from 'node-telegram-bot-api';
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

let db;

const defaultDatabaseState = {
  histories: {
    id: 1,
    name: "Вроде бы типичный день",
    state: "Однажды он просто встал, почистил зубы и резко осознал тот факт, что"
  }
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
      { command: '/continue', description: 'Продолжить текст' },
    ]
  )

  bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === "/start") {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/e1f/4c4/e1f4c48a-c808-37a7-a037-bfa58e8b3222/1.webp')
      return bot.sendMessage(chatId, `Привет, ${msg.from.first_name} ${msg.from.last_name}! Добро пожаловать в "Продолжим?"`)
    }

    if (text === "/continue") {
      db.data.histories.push({
        id: 2,
        name: "Вроде бы типичный день",
        state: "Однажды он просто встал, почистил зубы и резко осознал тот факт, что"
      })
      console.log('sdgdf', db.data)
      await bot.sendMessage(chatId, "sdf")
    }

    return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй объяснить еще раз!`)
  })
}

start()