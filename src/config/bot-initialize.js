import TelegramApi from "node-telegram-bot-api";

const token = "5035331349:AAHG-3mOMX0gu-1X0bDA31PxTXGQ1akhn1E"
export const bot = new TelegramApi(token, { polling: true })