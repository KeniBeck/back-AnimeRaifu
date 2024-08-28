import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";

@Injectable()
export class EpisodeRankingService {

    async extractRankingEpisode(url: string) {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // Deshabilitar la intercepción de solicitudes
        await page.setRequestInterception(false);

        const allEpisodes = [];
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await page.waitForSelector('.anime-page__episode-list', { timeout: 200000 });
            const episodesList = await page.evaluate(() => {
                const episodes = Array.from(document.querySelectorAll('.anime-page__episode-list li'));
                return episodes.map(episode => {
                    const url_episode = episode.querySelector('a').getAttribute('href');
                    const number_episode = episode.querySelector('a span').textContent;
                    return { url_episode, number_episode };

                });

            });
            allEpisodes.push(...episodesList);
            await browser.close();
            return allEpisodes;


        } catch (error) {

        }
    }
}