
const TelegramApi = require('node-telegram-bot-api');
var express = require("express");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var path = require("path");
var adapter = new FileSync("db.json");
var db = low(adapter);
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


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
      app.get("/histories", function(request, response) {
        console.log('histories', response)
      });
      await bot.sendMessage("")
    }

    return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй объяснить еще раз!`)
  })
}

start()

var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});