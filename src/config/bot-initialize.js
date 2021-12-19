import TelegramApi from "node-telegram-bot-api";

const token = "5095279262:AAGs5jMWsJIk4Covwd8ETBoOGlHIFvNL6v4"
export const bot = new TelegramApi(token, { polling: true })