import { Injectable } from "@nestjs/common";
import exp from "constants";
import puppeteer from "puppeteer";

@Injectable()
export class EpisodeUrlService {

    async extractUrlEpisode(url: string) {
        const browser = await puppeteer.launch({ headless: false })
        const page = browser.newPage()
    }
}