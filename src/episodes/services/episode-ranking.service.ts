import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";

@Injectable()
export class EpisodeRankingService {
    async extractRankingEpisode() {
        const browser = await puppeteer.launch({ headless: false })
        const [page] = await browser.pages()
    }


}