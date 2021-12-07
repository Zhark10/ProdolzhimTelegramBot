const TelegramApi = require('node-telegram-bot-api');

const token = '5035331349:AAHG-3mOMX0gu-1X0bDA31PxTXGQ1akhn1E'

const bot = new TelegramApi(token, { polling: true })

bot.on('message', (msg) => {
  const text = msg.text
  const chatId = msg.chat.id
  bot.sendMessage(chatId, `Ты написал мне ${text}`)
  console.log(msg)
})