import puppeteer from 'puppeteer';
import { getHtmlTemplateForSimpleMessage } from './helpers/get-html-template-for-simple-message.js'

export class TemplateService {
  constructor() { }

  createTemplateForSimpleMessage = async (message) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 360, height: 96, deviceScaleFactor: 3});
    await page.setContent(getHtmlTemplateForSimpleMessage(message));
    const picture = await page.screenshot({
      type: 'png',
      fullPage: true,
    });
    await browser.close();
    return picture;
  }
}