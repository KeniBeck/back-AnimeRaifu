import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EpisodeRankingService } from './services/episode-ranking.service';


@Injectable()
export class EpisodesService {

  constructor(
    private episodeRanking: EpisodeRankingService,
    private prisma: PrismaService,
  ) { }

  async create(id: string, url: string) {

    try {

      const existingAnime = await this.prisma.anime.findFirst({
        where: {
          id: id
        }
      })
      if (!existingAnime) {
        throw new NotFoundException(
          `Anime with id ${id} not found`
        )
      }
      const episodes = await this.episodeRanking.extractRankingEpisode(url);

      const createdEpisodes = await Promise.all(episodes.map(episode => {
        return this.prisma.episode.create({
          data: {
            url_episode: episode.url_episode,
            number_episode: episode.number_episode,
            img_episode: episode.img_episode,
            id_anime: id

          }
        });
      }));

      return createdEpisodes;

    } catch (error) {
      return error.message;
    }



  }

  findAll() {
    return this.prisma.episode.findMany();
  }

  findOne(id: string) {
    return this.prisma.episode.findMany({
      where: {
        id_anime: id
      }
    });
  }

  episodeUrl(id: string, url: string) {

  }

  remove(id: string) {
    return this.prisma.episode.deleteMany({
      where: {
        id_anime: id
      }
    });
  }
}
