const TelegramApi = require('node-telegram-bot-api');

const token = '5035331349:AAHG-3mOMX0gu-1X0bDA31PxTXGQ1akhn1E'

const bot = new TelegramApi(token, { polling: true })

bot.setMyCommands(
  [
    {command: '/start', description: 'Приветствие'}
  ]
)

bot.on('message', async (msg) => {
  const text = msg.text
  const chatId = msg.chat.id

  if (text === "/start") {
    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/e1f/4c4/e1f4c48a-c808-37a7-a037-bfa58e8b3222/1.webp')
    await bot.sendMessage(chatId, `Привет, ${msg.from.first_name} ${msg.from.last_name}! Добро пожаловать в "Продолжим?"`)
    return
  }

  bot.sendMessage(chatId, `Ты написал мне ${text}`)
  console.log(msg)
})