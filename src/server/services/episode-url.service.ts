import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";

@Injectable()
export class EpisodeUrlService {

    async extractUrlEpisode(url: string) {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        const allEpisodes = [];

        try {
            await page.goto(url, { timeout: 100000 });
            await page.waitForSelector('#video_box iframe');

            const urlEpisode = await page.$eval('#video_box iframe', iframe => iframe.src);
            allEpisodes.push(urlEpisode);

            return allEpisodes;
        } catch (error) {
            console.error('Error extracting URL:', error);
            return error.message;
        } finally {
            await browser.close();
        }
    }
}