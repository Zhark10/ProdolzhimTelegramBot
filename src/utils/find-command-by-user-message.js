import { CONSTANTS } from "../config/constants.js"

export const findCommandByUserMessage = text => {
  return Object.values(CONSTANTS.ALL_COMMANDS).find(command => text.includes(command))
}
