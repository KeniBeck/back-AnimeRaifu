import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ExtractRankingAnimeService {
    async extractRankingAnime() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();  // Create a new page

        try {
            await page.goto('https://www.animefenix.tv/animes', { waitUntil: 'domcontentloaded' });
            await page.waitForSelector('.flex.justify-center.mt-8 nav', { timeout: 200000 });

            const totalPages = await page.evaluate(() => {
                const paginationLinks = Array.from(document.querySelectorAll('.flex.justify-center.mt-8 nav a'));
                const lastPageLink = paginationLinks[paginationLinks.length - 2];
                return parseInt(lastPageLink.textContent.trim());
            });

            const allAnimes = [];

            for (let i = 1; i <= totalPages; i++) {
                await page.goto(`https://www.animefenix.tv/animes?page=${i}`, { waitUntil: 'domcontentloaded' });

                await page.waitForSelector('.grid.grid-cols-2.sm\\:grid-cols-3.md\\:grid-cols-4.lg\\:grid-cols-5.gap-4 a', { timeout: 200000 });
                const animes = await page.evaluate(() => {
                    const animeItems = Array.from(document.querySelectorAll('.grid.grid-cols-2.sm\\:grid-cols-3.md\\:grid-cols-4.lg\\:grid-cols-5.gap-4 a'));
                    return animeItems.map(elem => {
                        const titleElement = elem.querySelector('h3');
                        const title = titleElement.textContent.trim();
                        const banner_url = elem.getAttribute('href');
                        const imageElement = elem.querySelector('img');
                        const image_url = imageElement.getAttribute('src');
                        const yearElement = elem.querySelector('.bg-primary');
                        const year = yearElement ? yearElement.textContent.trim() : '';
                        const statusElement = elem.querySelector('.bg-zinc-700');
                        const status = statusElement ? statusElement.textContent.trim() : '';

                        return { title, banner_url, image_url, year, status };
                    });
                });

                allAnimes.push(...animes);
            }

            return allAnimes;

        } catch (error) {
            console.error(error);
            return error.message;

        } finally {
            await browser.close();
        }
    }
}