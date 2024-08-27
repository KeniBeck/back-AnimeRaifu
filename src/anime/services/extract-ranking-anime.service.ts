import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ExtractRankingAnimeService {
    async extractRankingAnime() {
        const browser = await puppeteer.launch({ headless: false });
        const [page] = await browser.pages();  // Get the initial page

        try {
            await page.goto('https://jkanime.net/ranking/', { waitUntil: 'domcontentloaded' });

            // Aumentar el tiempo de espera a 10 segundos
            await page.waitForSelector('.page_mirando .anime__item', { timeout: 200000 });
            const animes = await page.evaluate(() => {
                const animeItems = Array.from(document.querySelectorAll('.page_mirando .anime__item'));
                return animeItems.map(elem => {
                    const titleElement = elem.querySelector('h5 a');
                    const title = titleElement.textContent;
                    const imageElement = elem.querySelector('.anime__item__pic');
                    const computedStyle = window.getComputedStyle(imageElement);
                    const backgroundImage = computedStyle.backgroundImage;

                    // Verificar si el estilo de fondo de la imagen está presente
                    let image_url = '';
                    if (backgroundImage && backgroundImage !== 'none') {
                        const imageMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
                        image_url = imageMatch ? imageMatch[1] : '';
                    }

                    const Emision = title.includes('En emision');
                    let banner_url = titleElement.getAttribute('href');

                    // Prepend 'https://jkanime.net' to the URL if it's not already there
                    if (!banner_url.startsWith('https://jkanime.net')) {
                        banner_url = `https://jkanime.net${banner_url}`;
                    }

                    return { title, image_url, Emision, banner_url };
                });
            });

            return animes;

        } catch (error) {
            console.error(error);
            return error.message;
        } finally {
            await browser.close();
        }
    }
}