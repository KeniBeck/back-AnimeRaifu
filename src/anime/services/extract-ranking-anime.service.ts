import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ExtractRankingAnimeService {
    async extractRankingAnime() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();  // Create a new page

        try {
            await page.goto('https://www.animefenix.tv/animes', { waitUntil: 'domcontentloaded' });
            await page.waitForSelector('.pagination-list', { timeout: 200000 });

            const totalPages = await page.evaluate(() => {
                const paginationLinks = Array.from(document.querySelectorAll('.pagination-list .pagination-link'));
                const lastPageLink = paginationLinks[paginationLinks.length - 2];
                return parseInt(lastPageLink.textContent);
            });

            const allAnimes = [];

            for (let i = 1; i <= totalPages; i++) {
                await page.goto(`https://www.animefenix.tv/animes?page=${i}`, { waitUntil: 'domcontentloaded' });

                await page.waitForSelector('.list-series .serie-card', { timeout: 200000 });
                const animes = await page.evaluate(() => {
                    const animeItems = Array.from(document.querySelectorAll('.list-series .serie-card'));
                    return animeItems.map(elem => {
                        const sinopsis = elem.querySelector('.serie-card__information p').textContent;
                        const titleElement = elem.querySelector('.title h3 a');
                        const title = titleElement.textContent;
                        const banner_url = titleElement.getAttribute('href');
                        const imageElement = elem.querySelector('figure.image img');
                        const image_url = imageElement.getAttribute('src');
                        const yearElement = elem.querySelector('figure.image .tag.year');
                        const year = yearElement ? yearElement.textContent : '';
                        const typeElement = elem.querySelector('figure.image .tag.type');
                        const type = typeElement ? typeElement.textContent : '';
                        const emissionElement = elem.querySelector('figure.image .tag.airing')
                        const emission = emissionElement ? true : false;

                        return { title, sinopsis, banner_url, image_url, year, type, emission };
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