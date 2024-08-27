import { Injectable } from "@nestjs/common";
import puppeteer, { Page } from "puppeteer";

@Injectable()
export class EpisodeRankingService {

    async extractRankingEpisode(url: string) {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // Deshabilitar la intercepción de solicitudes
        await page.setRequestInterception(false);

        const allEpisodes = [];

        try {
            await page.goto(url, { waitUntil: 'networkidle2' });

            // Esperar un momento para que los anuncios se carguen
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Eliminar anuncios del DOM
            await this.removeAds(page);

            // Obtener todos los enlaces de paginación
            const paginationLinks = await page.$$eval('.anime__pagination a.numbers', links => links.map(link => link.href));

            for (const link of paginationLinks) {
                const newPage = await browser.newPage();
                await newPage.goto(link, { waitUntil: 'networkidle2' });

                // Esperar momento para que la página se cargue completamente
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Eliminar anuncios del DOM
                await this.removeAds(newPage);

                // Extraer episodios de la página actual
                const episodes = await newPage.$$eval('#episodes-content .epcontent .anime__item', episodes => episodes.map(episode => {
                    const url_episode = episode.querySelector('div a')?.getAttribute('href') || '';
                    const number_episode = episode.querySelector('ul li span')?.textContent || '';
                    const img_episode = episode.querySelector('.anime__item__pic.homemini.set-bg')?.getAttribute('data-setbg') || '';

                    return { url_episode, number_episode, img_episode };
                }));

                allEpisodes.push(...episodes);
                await newPage.close();
            }


        } catch (error) {
            console.error(`Error al extraer episodios: `, error);
        }

        await browser.close();
        return allEpisodes;
    }

    // Función para eliminar anuncios del DOM
    private async removeAds(page: Page) {
        const adSelector = 'span[style*="align-items: center"][style*="background: rgba(255, 255, 255, 0.5)"][style*="border-color: rgb(229, 229, 229)"][style*="border-radius: 0.8em"][style*="border-style: solid"][style*="border-width: 1px"][style*="display: flex"][style*="flex-direction: column"][style*="font-size: 1.6em"][style*="font-weight: bold"][style*="justify-content: center"][style*="line-height: 113%"][style*="padding: 0.8em 0px"][style*="cursor: pointer"][style*="white-space: nowrap"][style*="max-width: 114px"][style*="width: 35%"][style*="bottom: 0px"][style*="left: 0px"][style*="position: absolute"][style*="opacity: 1"]';

        await page.evaluate((selector) => {
            const adElement = document.querySelector(selector);
            if (adElement) {
                adElement.remove();
            }
        }, adSelector);
    }

}